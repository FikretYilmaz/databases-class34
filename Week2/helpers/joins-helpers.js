const authorsAndMentors = `
SELECT author_name,mentor FROM author`;

const authorsAndPublishPapers = `
SELECT author.*,research_papers.paper_title FROM author 
LEFT JOIN research_Papers
ON author.author_no =research_Papers.fk_author_no`;
module.exports.authorsAndMentors = authorsAndMentors;
module.exports.authorsAndPublishPapers = authorsAndPublishPapers;
