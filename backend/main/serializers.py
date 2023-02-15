from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Skill


class SkillField(serializers.RelatedField):
    """Custom RelatedField Serializer for representation of a Skill"""

    def to_representation(self, value: Skill):
        return value.skill_name


class UserField(serializers.RelatedField):
    """Custom RelatedField Serializer for representation of a User"""

    def to_representation(self, value: User):
        fields = {"username": value.username, "id": value.pk, "email": value.email}
        return fields


class SkillSerializer(serializers.ModelSerializer):
    users = UserField(many=True, read_only=True)

    class Meta:
        model = Skill
        fields = ("id", "skill_name", "users")

    # Need to override create and update because of users
    def create(self, validated_data):
        skill_name = validated_data.get("skill_name")
        users = validated_data.get("users")
        skill = Skill.objects.create(skill_name=skill_name)
        skill.users.set(users)

        skill.save()

        return skill

    def update(self, instance: Skill, validated_data):
        instance.skill_name = validated_data.get("skill_name", instance.skill_name)
        users = validated_data.get("users", instance.users.all())
        for i in users:
            instance.users.add(i.pk)

        instance.save()

        return instance


class UserSerializer(serializers.ModelSerializer):
    """User model Serializer for django User model"""

    skills = SkillField(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "skills",
            "first_name",
            "last_name",
            "email",
        ]

    # user can create a new user without password
    def create(self, validated_data):
        username = validated_data.get("username")
        email = validated_data.get("email")
        first_name = validated_data.get("first_name")
        last_name = validated_data.get("last_name")
        user = User.objects.create_user(  # type: ignore
            username=username, email=email, first_name=first_name, last_name=last_name
        )
        user.set_password("password123")
        user.save()

        return user

    # Users can only update email, first_name, last_name not username
    def update(self, instance: User, validated_data):
        instance.email = validated_data.get("email", instance.email)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.username = instance.username

        # Check if there is a skill_list came in to the request for update skills
        skill_list = type(validated_data.get("skill_list")) is list
        if skill_list:
            req_skill_set = set([i.lower() for i in validated_data.get("skill_list")])
            user_skill_set = set(
                [i.skill_name.lower() for i in instance.skills.all()]  # type: ignore
            )

            # Checck set difference to find add/remove skills
            add_skills = req_skill_set - user_skill_set
            remove_skills = user_skill_set - req_skill_set

            # Add new skill
            if add_skills:
                for skill in add_skills:
                    skills = Skill.objects.filter(skill_name__iexact=skill)
                    if skills:
                        # Update the existing skill model
                        instance.skills.add(skills[0].pk)  # type: ignore
                    else:
                        # Create a new skill model and add this user
                        skill_serializer = SkillSerializer(data={"skill_name": skill})
                        users = User.objects.filter(pk=instance.pk)
                        if skill_serializer.is_valid():
                            skill_serializer.save(users=users)
                        else:
                            raise serializers.ValidationError("Error creating skill")

            # Remove skill
            if remove_skills:
                for skill in remove_skills:
                    skills = Skill.objects.filter(skill_name__iexact=skill)
                    if skills:
                        # remove the user from the skill
                        skills[0].users.remove(instance.pk)

        instance.save()

        return instance
