INSERT INTO usuarios (username, password, rol) VALUES ('seva', '12345', 'ADMIN') ON CONFLICT DO NOTHING;
INSERT INTO usuarios (username, password, rol) VALUES ('benja', '12345', 'USER') ON CONFLICT DO NOTHING;

INSERT INTO tratamientos (nombre, descripcion, precio, duracion_minutos) 
VALUES ('Limpieza Dental', 'Limpieza profunda con ultrasonido', 35000, 30) ON CONFLICT DO NOTHING;

INSERT INTO tratamientos (nombre, descripcion, precio, duracion_minutos) 
VALUES ('Extracción Simple', 'Extracción de pieza dental sin cirugía', 25000, 45) ON CONFLICT DO NOTHING;

INSERT INTO tratamientos (nombre, descripcion, precio, duracion_minutos) 
VALUES ('Blanqueamiento LED', 'Blanqueamiento estético de última generación', 80000, 60) ON CONFLICT DO NOTHING;

INSERT INTO citas (nombre_paciente, correo, tratamiento, fecha, hora, usuario_id) 
VALUES ('Baldomero Lillo', 'blillo@gmail.com', 'Limpieza Dental', '2026-06-15', '10:00:00', 1) ON CONFLICT DO NOTHING;

INSERT INTO citas (nombre_paciente, correo, tratamiento, fecha, hora, usuario_id) 
VALUES ('Isidora Goyenechea', 'igoyenechea@gmail.com', 'Blanqueamiento LED', '2026-06-16', '15:30:00', 1) ON CONFLICT DO NOTHING;