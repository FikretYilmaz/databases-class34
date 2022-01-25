const allResearchPapers = `
SELECT paper_title,COUNT(fk_author_no) AS Number_of_Authors FROM research_Papers GROUP BY paper_title;`;

const sumOfFemaleResearchPapers = `
SELECT COUNT(paper_id) AS Sum_Of_Female_Research_Papers FROM research_papers INNER JOIN author
ON author.author_no=research_papers.fk_author_no WHERE gender='f';`;
const avgOfHIndex = `SELECT AVG(h_index) AS Average_Of_H_Index,university FROM author GROUP BY university;`;
const authorResearches = `SELECT author_name,university,COUNT(paper_id) AS Author_Researches FROM author INNER JOIN research_papers ON author.author_no=research_papers.fk_author_no GROUP BY university;`;
const minAndMaxHIndex = `SELECT MIN(h_index) AS Minimum_H_Index,MAX(h_index) AS Maximum_H_Index,university FROM author GROUP BY university;`;
module.exports.allResearchPapers = allResearchPapers;
module.exports.sumOfFemaleResearchPapers = sumOfFemaleResearchPapers;
module.exports.avgOfHIndex = avgOfHIndex;
module.exports.authorResearches = authorResearches;
module.exports.minAndMaxHIndex = minAndMaxHIndex;
