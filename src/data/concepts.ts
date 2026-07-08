export type JavaConcept = {
  id: string
  term: string
  explanation: string
  example: string
  commonMistake: string
  quizQuestion: string
  quizAnswer: string
}

export const concepts: JavaConcept[] = [
  {
    id: 'class',
    term: 'class',
    explanation:
      'A class is a blueprint. It describes what one kind of object will store and do.',
    example: `public class Student {
    private String name;
}`,
    commonMistake:
      'Thinking the class is the actual student. The class is the plan. The object is the real student made from the plan.',
    quizQuestion: 'Is Student the blueprint or the actual object?',
    quizAnswer: 'Student is the blueprint. A variable like student1 is an object.',
  },
  {
    id: 'object',
    term: 'object',
    explanation:
      'An object is one real thing created from a class. It has its own stored values.',
    example: `Student student1 = new Student("Mia");`,
    commonMistake:
      'Forgetting new. In Java, new creates the object from the class.',
    quizQuestion: 'In Student student1 = new Student("Mia"); what is student1?',
    quizAnswer: 'student1 is an object variable that refers to one Student object.',
  },
  {
    id: 'field',
    term: 'field',
    explanation:
      'A field is information stored inside an object. It is usually private.',
    example: `private int score;`,
    commonMistake:
      'Making fields public. In D286, expect fields to usually be private and accessed with methods.',
    quizQuestion: 'Where does an object store its name, score, or price?',
    quizAnswer: 'In fields.',
  },
  {
    id: 'method',
    term: 'method',
    explanation:
      'A method is a named action. It can do work, return an answer, or both.',
    example: `public int getScore() {
    return score;
}`,
    commonMistake:
      'Using void when the method is supposed to give an answer back.',
    quizQuestion: 'What is getScore doing in this example?',
    quizAnswer: 'It returns the score value to the code that called it.',
  },
  {
    id: 'constructor',
    term: 'constructor',
    explanation:
      'A constructor runs when you create a new object. It fills in starting values.',
    example: `public Student(String name) {
    this.name = name;
}`,
    commonMistake:
      'Writing void in a constructor. Constructors do not have a return type, not even void.',
    quizQuestion: 'Does a constructor have a return type?',
    quizAnswer: 'No. A constructor uses the class name and has no return type.',
  },
  {
    id: 'private',
    term: 'private',
    explanation:
      'private means only code inside the same class can directly use it.',
    example: `private double balance;`,
    commonMistake:
      'Thinking private means useless. Private just means protected inside the object.',
    quizQuestion: 'Should fields usually be private or public?',
    quizAnswer: 'Private, so the object protects its own data.',
  },
  {
    id: 'public',
    term: 'public',
    explanation:
      'public means other classes are allowed to call or use it.',
    example: `public double getBalance() {
    return balance;
}`,
    commonMistake:
      'Making everything public. Usually methods are public, but fields stay private.',
    quizQuestion: 'Why is a getter often public?',
    quizAnswer: 'So other classes can safely ask for the value.',
  },
  {
    id: 'void',
    term: 'void',
    explanation:
      'void means the method does a job but does not give a value back.',
    example: `public void setScore(int score) {
    this.score = score;
}`,
    commonMistake:
      'Trying to return a value from a void method.',
    quizQuestion: 'Should a setter usually be void?',
    quizAnswer: 'Yes. A setter changes a field and usually returns nothing.',
  },
  {
    id: 'return-type',
    term: 'return type',
    explanation:
      'A return type tells Java what kind of value the method gives back.',
    example: `public String getName() {
    return name;
}`,
    commonMistake:
      'Writing void when the method needs to send back a String, int, double, or boolean.',
    quizQuestion: 'If a method returns text, what return type should it use?',
    quizAnswer: 'String.',
  },
  {
    id: 'array',
    term: 'array',
    explanation:
      'An array stores many values of the same type. Its size is fixed after it is created.',
    example: `int[] scores = {80, 90, 100};`,
    commonMistake:
      'Trying to use add on an array. Arrays use indexes, not add.',
    quizQuestion: 'Can a normal array grow after you create it?',
    quizAnswer: 'No. Its size is fixed.',
  },
  {
    id: 'arraylist',
    term: 'ArrayList',
    explanation:
      'An ArrayList stores many values and can grow when you add items.',
    example: `ArrayList<String> names = new ArrayList<>();
names.add("Sam");`,
    commonMistake:
      'Forgetting import java.util.ArrayList; at the top of the file.',
    quizQuestion: 'Which method adds an item to an ArrayList?',
    quizAnswer: 'add.',
  },
  {
    id: 'index',
    term: 'index',
    explanation:
      'An index is the position number of an item. Java starts counting at 0.',
    example: `int firstScore = scores[0];`,
    commonMistake:
      'Using 1 for the first item. The first index is 0.',
    quizQuestion: 'What index gets the first item?',
    quizAnswer: 'Index 0.',
  },
  {
    id: 'parameter',
    term: 'parameter',
    explanation:
      'A parameter is a variable listed in a method header. It receives a value when the method is called.',
    example: `public void setName(String name) {
    this.name = name;
}`,
    commonMistake:
      'Mixing up the field and the parameter when they have the same name.',
    quizQuestion: 'In setName(String name), what is name?',
    quizAnswer: 'name is a parameter.',
  },
  {
    id: 'argument',
    term: 'argument',
    explanation:
      'An argument is the actual value you pass into a method or constructor.',
    example: `student.setName("Ava");`,
    commonMistake:
      'Calling the value in the method call a parameter. In the call, it is an argument.',
    quizQuestion: 'In setName("Ava"), what is "Ava"?',
    quizAnswer: '"Ava" is an argument.',
  },
]
