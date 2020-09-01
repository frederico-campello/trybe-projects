DROP PROCEDURE IF EXISTS buscar_media_por_cargo;
USE hr;
DELIMITER $$

CREATE PROCEDURE buscar_media_por_cargo(IN cargo VARCHAR(100))
BEGIN
    SELECT ROUND(AVG(e.SALARY), 2) AS 'Média salarial'
    FROM hr.employees AS e
    INNER JOIN hr.jobs AS j
    ON e.JOB_ID = j.JOB_ID AND cargo = j.JOB_TITLE
    GROUP BY e.JOB_ID;
END $$

DELIMITER ;

CALL buscar_media_por_cargo('Programmer');
