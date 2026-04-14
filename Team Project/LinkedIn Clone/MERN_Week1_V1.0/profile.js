function addSkill(user, skill) {
    user.skills.push(skill);
}

function addExperience(user, exp) {
    user.experience.push(exp);
}

function addEducation(user, edu) {
    user.education.push(edu);
}

module.exports = {
    addSkill,
    addExperience,
    addEducation
};
