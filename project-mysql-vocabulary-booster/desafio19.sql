DROP PROCEDURE IF EXISTS exibir_historico_completo_por_funcionario;

USE hr;
DELIMITER $$

CREATE PROCEDURE exibir_historico_completo_por_funcionario(IN email VARCHAR(25))
BEGIN
    SELECT CONCAT(e.FIRST_NAME, ' ', e.LAST_NAME) AS 'Nome completo',
    d.DEPARTMENT_NAME AS Departamento,
    j.JOB_TITLE AS Cargo
    FROM hr.employees AS e
    INNER JOIN hr.job_history AS jh
    ON e.EMPLOYEE_ID = jh.EMPLOYEE_ID AND email = e.EMAIL
    INNER JOIN hr.departments AS d
    ON jh.DEPARTMENT_ID = d.DEPARTMENT_ID
    INNER JOIN hr.jobs AS j
    ON jh.JOB_ID = j.JOB_ID
    ORDER BY d.DEPARTMENT_NAME, j.JOB_TITLE; 
END $$

DELIMITER ;

CALL exibir_historico_completo_por_funcionario('NKOCHHAR');
