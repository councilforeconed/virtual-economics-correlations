var connection = require('../database');

var statement = 
" SELECT lessons.id AS _id, lessons.title, publications.title AS source, " +
"	  publications.id AS publicationID, LEFT(lessons.date_released, 4) AS year, " +
"	  publications.gradeLevel AS grades, publications.isbn, publications.pubtype " +
"	  AS audience, publications.url, publications.language, lessons.standards " +
" FROM lessons, publications" +
" WHERE lessons.publication_id = publications.id AND lessons.program_id != 1 " +
" AND (publications.ve4 = 'yes' OR publications.ve4 = 'no - released after ve4' ) ORDER BY lessons.id ASC"

var lessons = connection.query(statement).stream({highWaterMark: 5});

module.exports = lessons;