class Student {
  constructor(nombre, edad, curso, calificaciones) {
    this.nombre = nombre;
    this.edad = edad;
    this.curso = curso;
    this.calificaciones = calificaciones;
  }
}

const students = [
  new Student("Juan", 23, "Full Stack", [7, 8, 5, 4]),
  new Student("Miguel", 27, "Android", [6, 5, 4, 3]),
  new Student("Javier", 22, "iOS", [9, 8, 7, 6]),
  new Student("Susana", 19, "Full Stack", [4, 5, 5, 4]),
];

students.push(new Student("Mauro", 22, "Full Stack", [10, 10, 10, 10]));
students.push(new Student("Pedro", 24, "Android", [1, 2, 1, 2]));

students.forEach((student) => {
  console.log(
    `Nombre: ${student.nombre}, Curso: ${student.curso}, Edad: ${
      student.edad
    }, Promedio ${
      student.calificaciones.reduce((a, b) => a + b) /
      student.calificaciones.length
    }`
  );
});
