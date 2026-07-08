import type { Question } from '../types/Question'

export type MistakeLesson = {
  category: string
  explanation: string
  correctedExample: string
  matchedSkillTag: string
}

const lessonByCategory: Record<
  string,
  {
    explanation: string
    correctedExample: string
  }
> = {
  classes: {
    explanation:
      'A class is the blueprint. If the answer involves fields, constructors, or methods, think about what belongs inside the class box.',
    correctedExample: `public class Student {
    private String name;
}`,
  },
  objects: {
    explanation:
      'An object is one real thing made from a class. Look for new ClassName(...) when Java creates an object.',
    correctedExample: `Student student = new Student("Ava");`,
  },
  arrays: {
    explanation:
      'An array stores many values in numbered boxes. The first box is index 0, not index 1.',
    correctedExample: `int[] scores = {10, 20, 30};
int first = scores[0];`,
  },
  arraylists: {
    explanation:
      'An ArrayList is a growable list. Use methods like add(), get(), and size() instead of array square brackets.',
    correctedExample: `ArrayList<String> names = new ArrayList<>();
names.add("Ava");`,
  },
  constructors: {
    explanation:
      'A constructor fills in starting field values when an object is created. It has the same name as the class and no return type.',
    correctedExample: `public Student(String name) {
    this.name = name;
}`,
  },
  getters: {
    explanation:
      'A getter returns a private field value. Its return type should match the field type.',
    correctedExample: `public int getScore() {
    return score;
}`,
  },
  setters: {
    explanation:
      'A setter changes a private field. It usually uses void because it does not send a value back.',
    correctedExample: `public void setScore(int score) {
    this.score = score;
}`,
  },
  'public-private': {
    explanation:
      'private protects data inside the object. public means other classes are allowed to call or use it.',
    correctedExample: `private int score;

public int getScore() {
    return score;
}`,
  },
  'void-return-types': {
    explanation:
      'Use void when a method does a job and returns nothing. Use a return type like int or String when the method gives back an answer.',
    correctedExample: `public int getScore() {
    return score;
}`,
  },
  'method-parameters': {
    explanation:
      'A parameter is the variable in the method header. An argument is the real value passed into the method call.',
    correctedExample: `public void setAge(int age) {
    this.age = age;
}`,
  },
  indexing: {
    explanation:
      'Indexing means choosing a position. Java starts counting at 0, so the first item is index 0.',
    correctedExample: `String firstName = names.get(0);`,
  },
  loops: {
    explanation:
      'Loops repeat a small action. For arrays and lists, the loop usually visits one item at a time.',
    correctedExample: `for (int score : scores) {
    total += score;
}`,
  },
  'integer-division': {
    explanation:
      'Integer division drops the decimal part. If you need a decimal answer, make one value a double.',
    correctedExample: `double average = (double) total / count;`,
  },
  'compile-errors': {
    explanation:
      'Compile errors mean Java cannot understand the code yet. Check spelling, semicolons, braces, types, and return statements first.',
    correctedExample: `int count = 0;
return count;`,
  },
}

const aliases: Record<string, string> = {
  class: 'classes',
  classes: 'classes',
  object: 'objects',
  objects: 'objects',
  arrays: 'arrays',
  array: 'arrays',
  arraylists: 'arraylists',
  arraylist: 'arraylists',
  constructors: 'constructors',
  constructor: 'constructors',
  getters: 'getters',
  getter: 'getters',
  setters: 'setters',
  setter: 'setters',
  'public/private': 'public-private',
  'public-private': 'public-private',
  'private fields': 'public-private',
  void: 'void-return-types',
  'return types': 'void-return-types',
  'void vs return': 'void-return-types',
  parameters: 'method-parameters',
  parameter: 'method-parameters',
  argument: 'method-parameters',
  indexing: 'indexing',
  index: 'indexing',
  loops: 'loops',
  'for loops': 'loops',
  'while loops': 'loops',
  'integer division': 'integer-division',
  'compile errors': 'compile-errors',
  'common compile errors': 'compile-errors',
}

export function getMistakeLesson(question: Question): MistakeLesson {
  const matchedSkillTag =
    question.skillTags.find((skillTag) => getCategory(skillTag)) ??
    question.skillTags[0] ??
    question.topic
  const category = getCategory(matchedSkillTag) ?? 'compile-errors'
  const lesson = lessonByCategory[category]

  return {
    category,
    explanation: lesson.explanation,
    correctedExample: lesson.correctedExample,
    matchedSkillTag,
  }
}

export function getExpectedAnswerText(question: Question) {
  const correctChoice = question.choices?.find(
    (choice) => choice.id === question.correctChoiceId,
  )

  return (
    correctChoice?.text ??
    question.expectedAnswers?.[0] ??
    question.solution ??
    'Review the explanation and expected pattern for this question.'
  )
}

function getCategory(skillTag: string) {
  return aliases[skillTag.toLowerCase()]
}
