SELECT c.ContactName AS 'Nome de contato',
s.ShipperName AS 'Empresa que fez o envio',
o.OrderDate AS 'Data do pedido'
FROM w3schools.customers AS c
INNER JOIN w3schools.orders AS o
ON c.CustomerID = o.CustomerID AND o.ShipperID IN (1, 2)
INNER JOIN w3schools.shippers AS s
ON o.ShipperID = s.ShipperID
ORDER BY c.ContactName, s.ShipperName, o.OrderDate;
