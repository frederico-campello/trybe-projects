DROP FUNCTION IF EXISTS buscar_quantidade_de_empregos_por_funcionario;

USE hr;
DELIMITER $$

CREATE FUNCTION buscar_quantidade_de_empregos_por_funcionario(email VARCHAR (25))
RETURNS INT READS SQL DATA
BEGIN
DECLARE number_jobs INT;
SELECT COUNT(jh.EMPLOYEE_ID)
INTO number_jobs
FROM hr.job_history as jh
INNER JOIN hr.employees as e
ON email = e.EMAIL AND jh.EMPLOYEE_ID = e.EMPLOYEE_ID;
RETURN number_jobs;

END $$

DELIMITER ;

SELECT buscar_quantidade_de_empregos_por_funcionario('NKOCHHAR') AS total_empregos;
