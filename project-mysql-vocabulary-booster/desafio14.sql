SELECT c.Country AS País
FROM w3schools.customers AS c
UNION
SELECT s.Country AS País
FROM w3schools.suppliers AS s
GROUP BY País
ORDER BY País LIMIT 5;
