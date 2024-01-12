msg.payload = "VIDEO OUTPUT ROUTING:"; //calling the videohub to change the routing
node.send(msg); //sending the command
msg.payload = "\r\n"; //generating a return command
node.send(msg); //sending
msg.payload = "8 0"; //routing input 9 (which is in the code 8) to output 1 (which is 0)
node.send(msg); //sending
msg.payload = "\r\n \r\n"; //double return
node.send(msg); //sending
