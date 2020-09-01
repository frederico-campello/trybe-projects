SELECT CONCAT(e.FirstName, ' ', e.LastName) AS 'Nome completo',
COUNT(DISTINCT o.OrderID) AS 'Total de pedidos'
FROM w3schools.employees AS e
INNER JOIN w3schools.orders AS o
ON e.EmployeeID = o.EmployeeID
INNER JOIN w3schools.order_details AS od
ON o.OrderID = od.OrderID
GROUP BY CONCAT(e.FirstName, ' ', e.LastName)
ORDER BY COUNT(DISTINCT o.OrderID);
