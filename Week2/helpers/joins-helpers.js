const authorsAndMentors = `
  SELECT author_name, mentor 
  FROM author`;

const authorsAndPublishPapers = `
  SELECT author.*, research_papers.paper_title 
  FROM author 
  LEFT JOIN research_papers_authors ON (author.author_no = research_papers_authors.author_no)
  LEFT JOIN research_Papers ON (research_Papers.paper_id =research_papers_authors.paper_id)`;
module.exports.authorsAndMentors = authorsAndMentors;
module.exports.authorsAndPublishPapers = authorsAndPublishPapers;
