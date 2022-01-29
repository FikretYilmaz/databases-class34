const allResearchPapers = `
  SELECT research_Papers.paper_title, COUNT(author_name) AS Number_Of_Author
  FROM author
  JOIN research_papers_authors
  ON author.author_no = research_papers_authors.author_no
  JOIN research_Papers 
  ON research_Papers.paper_id= research_papers_authors.paper_id
  GROUP BY research_Papers.paper_title;`;

const sumOfFemaleResearchPapers = `
  SELECT COUNT(DISTINCT(paper_id)) AS Sum_Of_Female_Research_Papers 
  FROM research_papers 
  INNER JOIN author
  ON author.gender = 'f'`;
const avgOfHIndex = `
  SELECT AVG(h_index) AS Average_Of_H_Index, university 
  FROM author 
  GROUP BY university;`;

const authorResearches = `
  SELECT university, COUNT(research_Papers.paper_id) AS Author_Researches 
  FROM author 
  JOIN research_papers_authors ON author.author_no=research_papers_authors.author_no
  JOIN research_Papers ON research_Papers.paper_id= research_papers_authors.paper_id
  GROUP BY author.university;`;
const minAndMaxHIndex = `
  SELECT MIN(h_index) AS Minimum_H_Index, MAX(h_index) AS Maximum_H_Index, university FROM author 
  GROUP BY university;`;
module.exports.allResearchPapers = allResearchPapers;
module.exports.sumOfFemaleResearchPapers = sumOfFemaleResearchPapers;
module.exports.avgOfHIndex = avgOfHIndex;
module.exports.authorResearches = authorResearches;
module.exports.minAndMaxHIndex = minAndMaxHIndex;
