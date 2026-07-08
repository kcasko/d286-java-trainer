import type { Question } from '../types/Question'

export const finalLabPatterns: Question[] = [
  {
    id: 'final-lab-basic-class-fields-001',
    mode: 'end_lab',
    title: 'Java Lab Mastery: basic private fields',
    topic: 'Java Lab Mastery classes',
    skillTags: ['final-lab-pattern', 'classes', 'private fields'],
    prompt: 'Complete the basic Employee class by adding private name and id fields.',
    starterCode: `public class Employee {
    // TODO: add private fields
}`,
    expectedPatterns: [
      'private\\s+String\\s+name\\s*;',
      'private\\s+int\\s+id\\s*;',
    ],
    hint: 'Object data goes in fields. Fields are usually private.',
    explanation:
      'A basic Java Lab Mastery class usually starts with private fields that store object data.',
    difficulty: 'beginner',
    solution: `private String name;
private int id;`,
    visualizerType: 'class',
    visualizerData: {
      className: 'Employee',
      fields: ['private String name', 'private int id'],
      constructors: [],
      methods: [],
    },
  },
  {
    id: 'final-lab-constructor-fields-002',
    mode: 'end_lab',
    title: 'Java Lab Mastery: constructor initializes fields',
    topic: 'Java Lab Mastery constructors',
    skillTags: ['final-lab-pattern', 'constructors', 'classes'],
    prompt: 'Complete the Movie constructor so title and minutes are initialized.',
    starterCode: `public class Movie {
    private String title;
    private int minutes;

    // TODO: constructor
}`,
    expectedPatterns: [
      'public\\s+Movie\\s*\\(\\s*String\\s+title\\s*,\\s*int\\s+minutes\\s*\\)',
      'this\\.title\\s*=\\s*title\\s*;',
      'this\\.minutes\\s*=\\s*minutes\\s*;',
    ],
    hint: 'The constructor name must match the class name exactly.',
    explanation:
      'A constructor copies parameter values into the object fields when new Movie(...) runs.',
    difficulty: 'easy',
    solution: `public Movie(String title, int minutes) {
    this.title = title;
    this.minutes = minutes;
}`,
    visualizerType: 'class',
    visualizerData: {
      className: 'Movie',
      fields: ['private String title', 'private int minutes'],
      constructors: ['Movie(String title, int minutes)'],
      methods: [],
    },
  },
  {
    id: 'final-lab-getters-003',
    mode: 'end_lab',
    title: 'Java Lab Mastery: getter methods',
    topic: 'Java Lab Mastery getters',
    skillTags: ['final-lab-pattern', 'getters', 'return types'],
    prompt: 'Add getters for the private title and minutes fields.',
    starterCode: `public class Movie {
    private String title;
    private int minutes;

    // TODO: getTitle
    // TODO: getMinutes
}`,
    expectedPatterns: [
      'public\\s+String\\s+getTitle\\s*\\(\\s*\\)',
      'return\\s+title\\s*;',
      'public\\s+int\\s+getMinutes\\s*\\(\\s*\\)',
      'return\\s+minutes\\s*;',
    ],
    hint: 'Getter return type matches the field type.',
    explanation:
      'Getters let outside code read private data without making fields public.',
    difficulty: 'easy',
    solution: `public String getTitle() {
    return title;
}

public int getMinutes() {
    return minutes;
}`,
    visualizerType: 'class',
    visualizerData: {
      className: 'Movie',
      fields: ['private String title', 'private int minutes'],
      constructors: [],
      methods: ['getTitle()', 'getMinutes()'],
    },
  },
  {
    id: 'final-lab-setters-004',
    mode: 'end_lab',
    title: 'Java Lab Mastery: setter methods',
    topic: 'Java Lab Mastery setters',
    skillTags: ['final-lab-pattern', 'setters', 'void'],
    prompt: 'Add setters for name and id.',
    starterCode: `public class Employee {
    private String name;
    private int id;

    // TODO: setName
    // TODO: setId
}`,
    expectedPatterns: [
      'public\\s+void\\s+setName\\s*\\(\\s*String\\s+name\\s*\\)',
      'this\\.name\\s*=\\s*name\\s*;',
      'public\\s+void\\s+setId\\s*\\(\\s*int\\s+id\\s*\\)',
      'this\\.id\\s*=\\s*id\\s*;',
    ],
    hint: 'Setters change fields and usually return void.',
    explanation:
      'A setter is public so other classes can request a change, and void because it does not send back an answer.',
    difficulty: 'easy',
    solution: `public void setName(String name) {
    this.name = name;
}

public void setId(int id) {
    this.id = id;
}`,
    visualizerType: 'class',
    visualizerData: {
      className: 'Employee',
      fields: ['private String name', 'private int id'],
      constructors: [],
      methods: ['setName(String name)', 'setId(int id)'],
    },
  },
  {
    id: 'final-lab-calculated-value-005',
    mode: 'end_lab',
    title: 'Java Lab Mastery: return calculated value',
    topic: 'Java Lab Mastery methods',
    skillTags: ['final-lab-pattern', 'methods', 'return types'],
    prompt: 'Complete getPay so it returns hourlyRate times hoursWorked.',
    starterCode: `public class Paycheck {
    private double hourlyRate;
    private int hoursWorked;

    public double getPay() {
        // TODO: return pay
    }
}`,
    expectedPatterns: [
      'public\\s+double\\s+getPay\\s*\\(\\s*\\)',
      'return\\s+hourlyRate\\s*\\*\\s*hoursWorked\\s*;',
    ],
    hint: 'The result can be decimal money, so return double.',
    explanation:
      'When a method gives a calculated answer back, use a return type and a return statement.',
    difficulty: 'easy',
    solution: `public double getPay() {
    return hourlyRate * hoursWorked;
}`,
  },
  {
    id: 'final-lab-void-updates-field-006',
    mode: 'end_lab',
    title: 'Java Lab Mastery: void method updates field',
    topic: 'Java Lab Mastery methods',
    skillTags: ['final-lab-pattern', 'methods', 'void'],
    prompt: 'Complete addMiles so it increases miles by milesToAdd.',
    starterCode: `public class Car {
    private int miles;

    public void addMiles(int milesToAdd) {
        // TODO: update miles
    }
}`,
    expectedPatterns: [
      'public\\s+void\\s+addMiles\\s*\\(\\s*int\\s+milesToAdd\\s*\\)',
      'miles\\s*\\+=\\s*milesToAdd|miles\\s*=\\s*miles\\s*\\+\\s*milesToAdd',
    ],
    hint: 'This changes the object field. It does not need to return anything.',
    explanation:
      'Use void for a method that updates object state without giving a value back.',
    difficulty: 'easy',
    solution: `public void addMiles(int milesToAdd) {
    miles += milesToAdd;
}`,
  },
  {
    id: 'final-lab-array-output-007',
    mode: 'end_lab',
    title: 'Java Lab Mastery: array creation and output',
    topic: 'Java Lab Mastery arrays',
    skillTags: ['final-lab-pattern', 'arrays', 'loops'],
    prompt: 'Create an int array with 10, 20, 30 and print each value.',
    starterCode: `public class ArrayLab {
    public static void printValues() {
        // TODO: create array and print values
    }
}`,
    expectedPatterns: [
      'int\\s*\\[\\]\\s+values\\s*=\\s*\\{\\s*10\\s*,\\s*20\\s*,\\s*30\\s*\\}',
      'for\\s*\\(',
      'System\\.out\\.println\\s*\\(',
    ],
    hint: 'Create the array first, then loop through it.',
    explanation:
      'This pattern checks whether you can create an array and visit each item.',
    difficulty: 'easy',
    solution: `int[] values = {10, 20, 30};
for (int value : values) {
    System.out.println(value);
}`,
    visualizerType: 'array',
    visualizerData: {
      values: [10, 20, 30],
      operation: 'Loop prints index 0, then 1, then 2.',
    },
  },
  {
    id: 'final-lab-array-sum-008',
    mode: 'end_lab',
    title: 'Java Lab Mastery: array sum',
    topic: 'Java Lab Mastery arrays',
    skillTags: ['final-lab-pattern', 'arrays', 'sum array values'],
    prompt: 'Complete sumValues so it returns the total of all values.',
    starterCode: `public class ArrayLab {
    public static int sumValues(int[] values) {
        // TODO: sum values
    }
}`,
    expectedPatterns: [
      'int\\s+total\\s*=\\s*0',
      'for\\s*\\(',
      'total\\s*\\+=',
      'return\\s+total\\s*;',
    ],
    hint: 'Start at 0, add each item, return the total.',
    explanation:
      'Array sum is one of the most common loop patterns in Java labs.',
    difficulty: 'easy',
    solution: `int total = 0;
for (int value : values) {
    total += value;
}
return total;`,
    visualizerType: 'array',
    visualizerData: {
      values: [4, 6, 10],
      operation: '4 + 6 + 10 = 20',
    },
  },
  {
    id: 'final-lab-array-average-009',
    mode: 'end_lab',
    title: 'Java Lab Mastery: array average',
    topic: 'Java Lab Mastery arrays',
    skillTags: ['final-lab-pattern', 'arrays', 'calculate average'],
    prompt: 'Complete averageValues so it returns the average as a double.',
    starterCode: `public class ArrayLab {
    public static double averageValues(int[] values) {
        // TODO: average values
    }
}`,
    expectedPatterns: [
      'for\\s*\\(',
      'total\\s*\\+=',
      'return\\s+.*\\/\\s*values\\.length',
    ],
    hint: 'Average is total divided by values.length.',
    explanation:
      'Use double when division may create a decimal answer.',
    difficulty: 'medium',
    solution: `int total = 0;
for (int value : values) {
    total += value;
}
return (double) total / values.length;`,
    visualizerType: 'array',
    visualizerData: {
      values: [80, 90, 100],
      operation: '(80 + 90 + 100) / 3',
    },
  },
  {
    id: 'final-lab-array-smallest-010',
    mode: 'end_lab',
    title: 'Java Lab Mastery: array smallest value',
    topic: 'Java Lab Mastery arrays',
    skillTags: ['final-lab-pattern', 'arrays', 'find smallest array value'],
    prompt: 'Complete smallest so it returns the smallest value in values.',
    starterCode: `public class ArrayLab {
    public static int smallest(int[] values) {
        // TODO: find smallest
    }
}`,
    expectedPatterns: [
      'int\\s+smallest\\s*=\\s*values\\s*\\[\\s*0\\s*\\]',
      'for\\s*\\(',
      '<\\s*smallest',
      'return\\s+smallest\\s*;',
    ],
    hint: 'Use values[0] as the starting smallest value.',
    explanation:
      'Starting with the first array item avoids guessing a fake smallest value.',
    difficulty: 'medium',
    solution: `int smallest = values[0];
for (int value : values) {
    if (value < smallest) {
        smallest = value;
    }
}
return smallest;`,
    visualizerType: 'array',
    visualizerData: {
      values: [9, 3, 7],
      operation: '3 is the smallest box value.',
    },
  },
  {
    id: 'final-lab-array-largest-011',
    mode: 'end_lab',
    title: 'Java Lab Mastery: array largest value',
    topic: 'Java Lab Mastery arrays',
    skillTags: ['final-lab-pattern', 'arrays', 'find largest array value'],
    prompt: 'Complete largest so it returns the largest value in values.',
    starterCode: `public class ArrayLab {
    public static int largest(int[] values) {
        // TODO: find largest
    }
}`,
    expectedPatterns: [
      'int\\s+largest\\s*=\\s*values\\s*\\[\\s*0\\s*\\]',
      'for\\s*\\(',
      '>\\s*largest',
      'return\\s+largest\\s*;',
    ],
    hint: 'Use values[0] as the starting largest value.',
    explanation:
      'The loop updates largest only when it sees a bigger value.',
    difficulty: 'medium',
    solution: `int largest = values[0];
for (int value : values) {
    if (value > largest) {
        largest = value;
    }
}
return largest;`,
    visualizerType: 'array',
    visualizerData: {
      values: [9, 3, 17],
      operation: '17 is the largest box value.',
    },
  },
  {
    id: 'final-lab-arraylist-creation-012',
    mode: 'end_lab',
    title: 'Java Lab Mastery: ArrayList creation',
    topic: 'Java Lab Mastery ArrayLists',
    skillTags: ['final-lab-pattern', 'ArrayLists', 'Create ArrayList<String>'],
    prompt: 'Create an ArrayList<String> named names and return it.',
    starterCode: `import java.util.ArrayList;

public class ListLab {
    public static ArrayList<String> makeNames() {
        // TODO: create and return names
    }
}`,
    expectedPatterns: [
      'ArrayList\\s*<\\s*String\\s*>\\s+names\\s*=\\s*new\\s+ArrayList\\s*<\\s*\\>',
      'return\\s+names\\s*;',
    ],
    hint: 'ArrayList needs the type inside angle brackets.',
    explanation:
      'ArrayList<String> means this growable list stores String values.',
    difficulty: 'easy',
    solution: `ArrayList<String> names = new ArrayList<>();
return names;`,
    visualizerType: 'arraylist',
    visualizerData: {
      values: ['Ana', 'Ben'],
      operation: 'names.add("Cam") adds to the end.',
    },
  },
  {
    id: 'final-lab-arraylist-getter-013',
    mode: 'end_lab',
    title: 'Java Lab Mastery: ArrayList getter',
    topic: 'Java Lab Mastery ArrayLists',
    skillTags: ['final-lab-pattern', 'ArrayLists', 'Return ArrayList from getter'],
    prompt: 'Complete getNames so it returns the private names ArrayList.',
    starterCode: `import java.util.ArrayList;

public class Roster {
    private ArrayList<String> names = new ArrayList<>();

    // TODO: getNames
}`,
    expectedPatterns: [
      'public\\s+ArrayList\\s*<\\s*String\\s*>\\s+getNames\\s*\\(\\s*\\)',
      'return\\s+names\\s*;',
    ],
    hint: 'The getter return type must match ArrayList<String>.',
    explanation:
      'A getter can return a whole ArrayList field.',
    difficulty: 'easy',
    solution: `public ArrayList<String> getNames() {
    return names;
}`,
    visualizerType: 'arraylist',
    visualizerData: {
      values: ['Ana', 'Ben'],
      operation: 'getNames() returns the list reference.',
    },
  },
  {
    id: 'final-lab-add-object-parameter-014',
    mode: 'end_lab',
    title: 'Java Lab Mastery: add object parameter to ArrayList',
    topic: 'Java Lab Mastery ArrayLists',
    skillTags: ['final-lab-pattern', 'ArrayLists', 'Add object to ArrayList', 'Pass object into method'],
    prompt: 'Complete addItem so it adds the Item parameter to the items list.',
    starterCode: `import java.util.ArrayList;

public class Order {
    private ArrayList<Item> items = new ArrayList<>();

    public void addItem(Item item) {
        // TODO: add item
    }
}`,
    expectedPatterns: [
      'public\\s+void\\s+addItem\\s*\\(\\s*Item\\s+item\\s*\\)',
      'items\\.add\\s*\\(\\s*item\\s*\\)\\s*;',
    ],
    hint: 'The method parameter is already an Item object. Add it to the list.',
    explanation:
      'This pattern checks object parameters and ArrayList add in the same small task.',
    difficulty: 'easy',
    solution: `public void addItem(Item item) {
    items.add(item);
}`,
    visualizerType: 'arraylist',
    visualizerData: {
      values: ['Item A', 'Item B'],
      operation: 'items.add(item) places the parameter at the end.',
    },
  },
]
