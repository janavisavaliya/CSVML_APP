const predictSalary = (experience, education) => {
    experience = parseFloat(experience);
    const eduEncoded = education === "Masters" ? 1 : 0;

    // Fake ML model
    const salary = 5000 + (experience * 4000) + (eduEncoded * 3000);

    return Math.round(salary);
};

module.exports = predictSalary;
