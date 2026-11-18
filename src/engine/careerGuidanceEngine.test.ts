import { describe, it, expect } from 'vitest';
import { generateDynamicCareerRecommendations } from './careerGuidanceEngine';
import { StudentProfileInput } from '../types';

describe('Dynamic Career Guidance Engine', () => {
  // Test 1: MBA Finance + Python + SQL + Power BI
  it('should recommend financial and business analytics careers for MBA Finance with Python & SQL', () => {
    const profile: StudentProfileInput = {
      qualification: 'MBA',
      specialization: 'Finance',
      selectedSkills: ['Python', 'SQL', 'Power BI', 'Financial Analysis'],
      careerInterest: 'Finance',
      preferredCareerType: 'Hybrid (Technical + Business)'
    };

    const result = generateDynamicCareerRecommendations(profile);
    expect(result.recommendedCareers.length).toBeGreaterThanOrEqual(5);
    expect(result.recommendedCareers.length).toBeLessThanOrEqual(8);

    const careerNames = result.recommendedCareers.map((c) => c.careerName);
    // Should include financial data analyst or fintech analyst or risk analyst
    const hasFinancialRole = careerNames.some(
      (name) =>
        name.includes('Financial Data Analyst') ||
        name.includes('FinTech Analyst') ||
        name.includes('Risk Analyst') ||
        name.includes('Business Intelligence Analyst')
    );
    expect(hasFinancialRole).toBe(true);

    // Rule check: Data Scientist should NOT be top rank over Financial Data Analyst for MBA Finance
    expect(careerNames[0]).not.toBe('Data Scientist');
  });

  // Test 2: MBA Marketing + Excel + SQL + Google Analytics
  it('should recommend marketing analytics & growth careers for MBA Marketing', () => {
    const profile: StudentProfileInput = {
      qualification: 'MBA',
      specialization: 'Marketing',
      selectedSkills: ['Excel', 'SQL', 'Google Analytics', 'Digital Marketing'],
      careerInterest: 'Marketing',
      preferredCareerType: 'Hybrid (Technical + Business)'
    };

    const result = generateDynamicCareerRecommendations(profile);
    const careerNames = result.recommendedCareers.map((c) => c.careerName);
    const hasMarketingRole = careerNames.some(
      (name) => name.includes('Marketing Data Analyst') || name.includes('Growth Analyst')
    );
    expect(hasMarketingRole).toBe(true);
  });

  // Test 3: MBA HR + Excel + SQL + Power BI
  it('should recommend HR analyst & people analytics for MBA HR', () => {
    const profile: StudentProfileInput = {
      qualification: 'MBA',
      specialization: 'Human Resources',
      selectedSkills: ['Excel', 'SQL', 'Power BI', 'HR Analytics'],
      careerInterest: 'Human Resources',
      preferredCareerType: 'Hybrid (Technical + Business)'
    };

    const result = generateDynamicCareerRecommendations(profile);
    const careerNames = result.recommendedCareers.map((c) => c.careerName);
    const hasHrRole = careerNames.some((name) => name.includes('HR Analyst') || name.includes('HR Tech'));
    expect(hasHrRole).toBe(true);
  });

  // Test 4: B.Tech AI & Data Science + Python + Pandas + NumPy + Machine Learning
  it('should recommend Data Scientist & ML Engineer for B.Tech AI & Data Science', () => {
    const profile: StudentProfileInput = {
      qualification: 'B.Tech',
      specialization: 'AI & Data Science',
      selectedSkills: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'Generative AI'],
      careerInterest: 'Artificial Intelligence',
      preferredCareerType: 'Technical'
    };

    const result = generateDynamicCareerRecommendations(profile);
    const careerNames = result.recommendedCareers.map((c) => c.careerName);
    expect(careerNames.some((name) => name.includes('Data Scientist') || name.includes('Machine Learning'))).toBe(true);
  });

  // Test 5: B.Com + Excel + SQL + Power BI
  it('should recommend financial and MIS analyst roles for B.Com graduate', () => {
    const profile: StudentProfileInput = {
      qualification: 'B.Com',
      specialization: 'Accounting & Finance',
      selectedSkills: ['Excel', 'SQL', 'Power BI', 'Financial Analysis'],
      careerInterest: 'Finance',
      preferredCareerType: 'Business-Oriented'
    };

    const result = generateDynamicCareerRecommendations(profile);
    const careerNames = result.recommendedCareers.map((c) => c.careerName);
    expect(careerNames.some((name) => name.includes('Financial') || name.includes('MIS') || name.includes('Business Analyst'))).toBe(true);
  });

  // Test 6: Non-technical creative student selecting UI/UX Design & Figma
  it('should recommend UI/UX Product Designer for non-technical design skills', () => {
    const profile: StudentProfileInput = {
      qualification: 'BA',
      specialization: 'Design & Multimedia',
      selectedSkills: ['UI/UX Design', 'Figma', 'Graphic Design', 'Market Research'],
      careerInterest: 'Marketing',
      preferredCareerType: 'Non-Technical'
    };

    const result = generateDynamicCareerRecommendations(profile);
    const careerNames = result.recommendedCareers.map((c) => c.careerName);
    expect(careerNames.some((name) => name.includes('UI/UX'))).toBe(true);
  });

  // Test 7: Cloud & DevOps skills matching
  it('should recommend Cloud & DevOps Engineer for AWS, Docker & Linux skills', () => {
    const profile: StudentProfileInput = {
      qualification: 'B.Tech',
      specialization: 'Information Technology',
      selectedSkills: ['AWS', 'Docker', 'Linux', 'Git & GitHub', 'Python'],
      careerInterest: 'Software Development',
      preferredCareerType: 'Technical'
    };

    const result = generateDynamicCareerRecommendations(profile);
    const careerNames = result.recommendedCareers.map((c) => c.careerName);
    expect(careerNames.some((name) => name.includes('Cloud & DevOps'))).toBe(true);
  });

  // Test 8: Verify all 10 required items exist for each recommended career
  it('should include all 10 required output items for every recommendation', () => {
    const profile: StudentProfileInput = {
      qualification: 'B.Tech',
      specialization: 'Computer Science',
      selectedSkills: ['Python', 'JavaScript', 'SQL', 'React'],
      careerInterest: 'Software Development',
      preferredCareerType: 'Technical'
    };

    const result = generateDynamicCareerRecommendations(profile);
    expect(result.recommendedCareers.length).toBeGreaterThanOrEqual(5);

    for (const career of result.recommendedCareers) {
      expect(career.careerName).toBeDefined(); // 1. Career name
      expect(career.careerDescription).toBeDefined(); // 2. Career description
      expect(career.whyThisMatches).toBeDefined(); // 3. Why this career matches
      expect(career.requiredSkills.length).toBeGreaterThan(0); // 4. Required skills
      expect(career.skillsStudentHas).toBeDefined(); // 5. Skills student selected
      expect(career.skillsToLearn).toBeDefined(); // 6. Skills to learn
      expect(career.recommendedSoftwareAndTools.length).toBeGreaterThan(0); // 7. Software & tools
      expect(career.industryOpportunities).toBeDefined(); // 8. Industry opportunities
      expect(career.learningRoadmap.length).toBeGreaterThanOrEqual(2); // 9. Roadmap
      expect(career.suggestedProjects.length).toBeGreaterThanOrEqual(1); // 10. Suggested projects
    }
  });

  // Test 9: Career multiplier & adjacent career options unlocked
  it('should generate adjacent career options and extra skills needed to unlock them', () => {
    const profile: StudentProfileInput = {
      qualification: 'MBA',
      specialization: 'Finance',
      selectedSkills: ['SQL', 'Excel', 'Python'],
      careerInterest: 'Finance',
      preferredCareerType: 'Hybrid (Technical + Business)'
    };

    const result = generateDynamicCareerRecommendations(profile);
    expect(result.recommendedCareers.length).toBeGreaterThanOrEqual(5);

    const firstCareer = result.recommendedCareers[0];
    expect(firstCareer.adjacentCareersUnlocked).toBeDefined();
    expect(firstCareer.adjacentCareersUnlocked!.length).toBeGreaterThan(0);

    const firstAdj = firstCareer.adjacentCareersUnlocked![0];
    expect(firstAdj.adjacentCareerName).toBeDefined();
    expect(firstAdj.extraSkillsToAdd.length).toBeGreaterThan(0);
    expect(firstAdj.readinessPercentage).toBeGreaterThanOrEqual(50);
    expect(firstAdj.whyThisIsClose).toBeDefined();

    // High impact multiplier skills
    expect(result.highImpactSkillsToLearn).toBeDefined();
    expect(result.highImpactSkillsToLearn!.length).toBeGreaterThan(0);
  });

  // Test 10: Package of suggested jobs must be higher than existing job role package
  it('should ensure the package of suggested jobs is higher than the existing job role package', () => {
    const profile: StudentProfileInput = {
      qualification: 'MBA',
      specialization: 'Marketing',
      selectedSkills: ['Excel', 'SQL', 'Digital Marketing'],
      careerInterest: 'Marketing',
      preferredCareerType: 'Hybrid (Technical + Business)'
    };

    const result = generateDynamicCareerRecommendations(profile);
    expect(result.existingRoleBaseline).toBeDefined();
    expect(result.existingRoleBaseline?.traditionalPackage).toBeDefined();
    expect(result.existingRoleBaseline?.averageHike).toContain('+');

    for (const career of result.recommendedCareers) {
      expect(career.packageHikePercentage).toBeDefined();
      expect(career.packageHikePercentage).toContain('+');
      expect(career.existingJobRoleSalary).toBe(result.existingRoleBaseline?.traditionalPackage);

      // Verify numerical salary of recommended career is higher than baseline
      const suggestedMatch = career.salaryRange.match(/[\d.]+/g);
      const baselineMatch = result.existingRoleBaseline!.traditionalPackage.match(/[\d.]+/g);
      if (suggestedMatch && baselineMatch) {
        const suggestedMin = parseFloat(suggestedMatch[0]);
        const baselineMin = parseFloat(baselineMatch[0]);
        expect(suggestedMin).toBeGreaterThan(baselineMin);
      }
    }
  });
});
