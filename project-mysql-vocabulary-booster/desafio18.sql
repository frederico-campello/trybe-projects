DROP FUNCTION IF EXISTS exibir_quantidade_pessoas_contratadas_por_mes_e_ano;

USE hr;
DELIMITER $$

CREATE FUNCTION exibir_quantidade_pessoas_contratadas_por_mes_e_ano(month INT, year INT)
RETURNS INT READS SQL DATA
BEGIN
DECLARE number_people INT;
SELECT COUNT(e.EMPLOYEE_ID)
INTO number_people
FROM hr.employees as e
WHERE MONTH(e.HIRE_DATE) = month AND YEAR(e.HIRE_DATE) = year;
RETURN number_people;

END $$

DELIMITER ;

SELECT exibir_quantidade_pessoas_contratadas_por_mes_e_ano(6, 1987) AS total;
