import type { Question } from '../types/Question'
import { finalLabPatterns } from './finalLabPatterns'

const questionBank: Question[] = [
  {
    id: 'pa-class-student-001',
    mode: 'pa',
    title: 'Build a Student class',
    topic: 'classes',
    skillTags: ['classes', 'constructors', 'private fields', 'getters'],
    prompt:
      'Create a Student class with private name and score fields. Add a constructor and getter methods for both fields.',
    starterCode: `public class Student {
    // add fields, constructor, and getters here
}`,
    visualizerType: 'class',
    visualizerData: {
      className: 'Student',
      fields: ['private String name', 'private int score'],
      constructors: ['Student(String name, int score)'],
      methods: ['getName()', 'getScore()'],
    },
    expectedAnswers: [
      'private String name;',
      'private int score;',
      'public Student(String name, int score)',
      'public String getName()',
      'public int getScore()',
    ],
    expectedPatterns: [
      'private\\s+String\\s+name\\s*;',
      'private\\s+int\\s+score\\s*;',
      'public\\s+Student\\s*\\(\\s*String\\s+name\\s*,\\s*int\\s+score\\s*\\)',
      'return\\s+name\\s*;',
      'return\\s+score\\s*;',
    ],
    hint: 'Fields should usually be private. The constructor has the same name as the class.',
    explanation:
      'The class is the plan. The private fields store data, the constructor fills that data, and getters return it.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-setter-product-002',
    mode: 'pa',
    title: 'Add a setter safely',
    topic: 'setters',
    skillTags: ['classes', 'private fields', 'setters', 'void'],
    prompt:
      'Create a Product class with a private price field. Add a setPrice method that changes the price and does not return anything.',
    starterCode: `public class Product {
    private double price;

    // add setter here
}`,
    expectedAnswers: ['public void setPrice(double price)', 'this.price = price;'],
    expectedPatterns: [
      'public\\s+void\\s+setPrice\\s*\\(\\s*double\\s+price\\s*\\)',
      'this\\.price\\s*=\\s*price\\s*;',
    ],
    hint: 'A setter changes data. It usually uses void because it does not send back an answer.',
    explanation:
      'Use void when the method performs an action. Here, the action is updating the object field.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-array-total-003',
    mode: 'pa',
    title: 'Total an array',
    topic: 'arrays',
    skillTags: ['arrays', 'methods', 'return types'],
    prompt:
      'Write a public static method named totalScores that accepts an int array and returns the total of all scores.',
    starterCode: `public class ScoreHelper {
    public static int totalScores(int[] scores) {
        // add loop here
    }
}`,
    visualizerType: 'array',
    visualizerData: {
      values: [10, 20, 30],
      operation: 'scores[0] is 10, scores[1] is 20, scores[2] is 30',
    },
    expectedAnswers: [
      'public static int totalScores(int[] scores)',
      'int total = 0;',
      'return total;',
    ],
    expectedPatterns: [
      'public\\s+static\\s+int\\s+totalScores\\s*\\(\\s*int\\[\\]\\s+scores\\s*\\)',
      'for\\s*\\(',
      'total\\s*\\+=',
      'return\\s+total\\s*;',
    ],
    hint: 'Because the method sends back a number, its return type should be int.',
    explanation:
      'An array holds many scores. The method loops through them, adds them, and returns the final total.',
    difficulty: 'easy',
  },
  {
    id: 'pa-arraylist-names-004',
    mode: 'pa',
    title: 'Store names in an ArrayList',
    topic: 'ArrayLists',
    skillTags: ['ArrayLists', 'methods', 'void'],
    prompt:
      'Write a method named addName that accepts an ArrayList of Strings and a name. Add the name to the list.',
    starterCode: `import java.util.ArrayList;

public class NameHelper {
    public static void addName(ArrayList<String> names, String name) {
        // add name to list
    }
}`,
    visualizerType: 'arraylist',
    visualizerData: {
      values: ['Ava', 'Mia'],
      operation: 'names.add("Sam") adds Sam to the end.',
    },
    expectedAnswers: [
      'public static void addName(ArrayList<String> names, String name)',
      'names.add(name);',
    ],
    expectedPatterns: [
      'ArrayList\\s*<\\s*String\\s*>',
      'void\\s+addName',
      'names\\.add\\s*\\(\\s*name\\s*\\)\\s*;',
    ],
    hint: 'Use .add() with an ArrayList. This method changes the list, so void is okay.',
    explanation:
      'ArrayList can grow. Calling add puts a new item at the end of the list.',
    difficulty: 'easy',
  },
  {
    id: 'pa-bankaccount-constructor-005',
    mode: 'pa',
    title: 'Constructor with two fields',
    topic: 'constructors',
    skillTags: ['classes', 'constructors', 'private fields', 'getters'],
    prompt:
      'Create a BankAccount class with private owner and balance fields. Add a constructor and a getBalance method.',
    starterCode: `public class BankAccount {
    // add fields, constructor, and getBalance
}`,
    visualizerType: 'class',
    visualizerData: {
      className: 'BankAccount',
      fields: ['private String owner', 'private double balance'],
      constructors: ['BankAccount(String owner, double balance)'],
      methods: ['getBalance()'],
    },
    expectedAnswers: [
      'private String owner;',
      'private double balance;',
      'public BankAccount(String owner, double balance)',
      'public double getBalance()',
    ],
    expectedPatterns: [
      'private\\s+String\\s+owner\\s*;',
      'private\\s+double\\s+balance\\s*;',
      'public\\s+BankAccount\\s*\\(\\s*String\\s+owner\\s*,\\s*double\\s+balance\\s*\\)',
      'return\\s+balance\\s*;',
    ],
    hint: 'The constructor creates the starting state for one BankAccount object.',
    explanation:
      'A constructor is used when an object is created. Getters let outside code read private data safely.',
    difficulty: 'easy',
  },
  {
    id: 'oa-private-fields-001',
    mode: 'oa',
    title: 'Why make fields private?',
    topic: 'public/private',
    skillTags: ['classes', 'private fields', 'getters', 'setters'],
    prompt: 'Why are class fields usually marked private?',
    choices: [
      { id: 'a', text: 'So only methods inside the class can directly change them.' },
      { id: 'b', text: 'So the class cannot create objects.' },
      { id: 'c', text: 'So the fields become constants automatically.' },
      { id: 'd', text: 'So Java skips the constructor.' },
    ],
    correctChoiceId: 'a',
    hint: 'Private protects the data inside the object.',
    explanation:
      'Private fields are hidden from outside code. Public methods, like getters and setters, can control access.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-void-return-002',
    mode: 'oa',
    title: 'Choose void or return',
    topic: 'void vs return types',
    skillTags: ['methods', 'void', 'return types'],
    prompt:
      'A method prints a message and does not need to send a value back. Which return type should it use?',
    choices: [
      { id: 'a', text: 'int' },
      { id: 'b', text: 'String' },
      { id: 'c', text: 'void' },
      { id: 'd', text: 'double' },
    ],
    correctChoiceId: 'c',
    hint: 'No answer comes back to the caller.',
    explanation:
      'Use void when the method does work but does not return a value.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-constructor-name-003',
    mode: 'oa',
    title: 'Constructor name',
    topic: 'constructors',
    skillTags: ['classes', 'constructors', 'objects'],
    prompt: 'For a class named Course, which constructor header is correct?',
    choices: [
      { id: 'a', text: 'public void Course()' },
      { id: 'b', text: 'public Course()' },
      { id: 'c', text: 'public constructor Course()' },
      { id: 'd', text: 'public String Course()' },
    ],
    correctChoiceId: 'b',
    hint: 'A constructor has no return type, not even void.',
    explanation:
      'A constructor uses the exact class name and does not list a return type.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-array-index-004',
    mode: 'oa',
    title: 'Array first item',
    topic: 'arrays',
    skillTags: ['arrays', 'indexes'],
    prompt: 'Given int[] scores = {80, 90, 100}; what is scores[0]?',
    visualizerType: 'array',
    visualizerData: {
      values: [80, 90, 100],
      operation: 'scores[0] points to the first box.',
    },
    choices: [
      { id: 'a', text: '0' },
      { id: 'b', text: '80' },
      { id: 'c', text: '90' },
      { id: 'd', text: '100' },
    ],
    correctChoiceId: 'b',
    hint: 'Java arrays start counting at index 0.',
    explanation:
      'Index 0 is the first position, so scores[0] is 80.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-arraylist-add-005',
    mode: 'oa',
    title: 'Add to an ArrayList',
    topic: 'ArrayLists',
    skillTags: ['ArrayLists', 'methods'],
    prompt: 'Which line adds "Sam" to an ArrayList<String> named names?',
    visualizerType: 'arraylist',
    visualizerData: {
      values: ['Ava', 'Mia'],
      operation: 'names.add("Sam") grows the list by one box.',
    },
    choices: [
      { id: 'a', text: 'names.put("Sam");' },
      { id: 'b', text: 'names.add("Sam");' },
      { id: 'c', text: 'names[0] = "Sam";' },
      { id: 'd', text: 'names.append = "Sam";' },
    ],
    correctChoiceId: 'b',
    hint: 'ArrayList uses methods, not square brackets, to add new items.',
    explanation:
      'The add method places a new item into the ArrayList.',
    difficulty: 'beginner',
  },
  {
    id: 'lab-item-class-001',
    mode: 'end_lab',
    title: 'Create an Item class',
    topic: 'classes',
    skillTags: ['classes', 'constructors', 'getters', 'private fields'],
    prompt:
      'Complete the Item class. It needs private name and quantity fields, a constructor, and getters for both fields.',
    starterCode: `public class Item {
    // TODO: private fields

    // TODO: constructor

    // TODO: getters
}`,
    visualizerType: 'class',
    visualizerData: {
      className: 'Item',
      fields: ['private String name', 'private int quantity'],
      constructors: ['Item(String name, int quantity)'],
      methods: ['getName()', 'getQuantity()'],
    },
    expectedAnswers: [
      'private String name;',
      'private int quantity;',
      'public Item(String name, int quantity)',
      'public String getName()',
      'public int getQuantity()',
    ],
    expectedPatterns: [
      'private\\s+String\\s+name\\s*;',
      'private\\s+int\\s+quantity\\s*;',
      'this\\.name\\s*=\\s*name\\s*;',
      'this\\.quantity\\s*=\\s*quantity\\s*;',
    ],
    hint: 'Build it in this order: fields, constructor, getters.',
    explanation:
      'This is the basic class pattern: private data, constructor to set data, getters to read data.',
    difficulty: 'easy',
  },
  {
    id: 'lab-average-array-002',
    mode: 'end_lab',
    title: 'Average an array',
    topic: 'arrays',
    skillTags: ['arrays', 'loops', 'return types'],
    prompt:
      'Complete averageScores. It should return the average of the numbers in the scores array.',
    starterCode: `public class ScoreHelper {
    public static double averageScores(int[] scores) {
        // TODO: total scores and return average
    }
}`,
    visualizerType: 'array',
    visualizerData: {
      values: [70, 80, 90],
      operation: 'Average means add all boxes, then divide by 3.',
    },
    expectedAnswers: ['double', 'return', 'scores.length'],
    expectedPatterns: [
      'public\\s+static\\s+double\\s+averageScores\\s*\\(\\s*int\\[\\]\\s+scores\\s*\\)',
      'for\\s*\\(',
      'scores\\.length',
      'return\\s+',
    ],
    hint: 'Average means total divided by how many scores there are.',
    explanation:
      'The method returns a decimal answer, so double is the right return type.',
    difficulty: 'medium',
  },
  {
    id: 'lab-arraylist-count-003',
    mode: 'end_lab',
    title: 'Count passing scores',
    topic: 'ArrayLists',
    skillTags: ['ArrayLists', 'loops', 'return types'],
    prompt:
      'Complete countPassing. It should return how many scores in the ArrayList are 70 or higher.',
    starterCode: `import java.util.ArrayList;

public class ScoreHelper {
    public static int countPassing(ArrayList<Integer> scores) {
        // TODO: count scores >= 70
    }
}`,
    visualizerType: 'arraylist',
    visualizerData: {
      values: [65, 72, 88],
      operation: 'scores.add(91) would place 91 at the end.',
    },
    expectedAnswers: ['ArrayList<Integer>', 'int count = 0;', 'return count;'],
    expectedPatterns: [
      'ArrayList\\s*<\\s*Integer\\s*>',
      'for\\s*\\(',
      '>=\\s*70',
      'count\\s*\\+\\+|count\\s*=\\s*count\\s*\\+\\s*1',
      'return\\s+count\\s*;',
    ],
    hint: 'Start count at 0. Add 1 each time a score is at least 70.',
    explanation:
      'The method must send back a count, so it returns int instead of void.',
    difficulty: 'medium',
  },
  {
    id: 'lab-book-setter-004',
    mode: 'end_lab',
    title: 'Update a Book title',
    topic: 'setters',
    skillTags: ['classes', 'setters', 'void', 'private fields'],
    prompt:
      'Complete the Book class by adding a setTitle method that updates the private title field.',
    starterCode: `public class Book {
    private String title;

    public Book(String title) {
        this.title = title;
    }

    // TODO: add setTitle
}`,
    visualizerType: 'class',
    visualizerData: {
      className: 'Book',
      fields: ['private String title'],
      constructors: ['Book(String title)'],
      methods: ['setTitle(String title)'],
    },
    expectedAnswers: ['public void setTitle(String title)', 'this.title = title;'],
    expectedPatterns: [
      'public\\s+void\\s+setTitle\\s*\\(\\s*String\\s+title\\s*\\)',
      'this\\.title\\s*=\\s*title\\s*;',
    ],
    hint: 'A setter changes the object. It usually returns void.',
    explanation:
      'The setter updates a private field through a public method.',
    difficulty: 'easy',
  },
  {
    id: 'lab-method-return-005',
    mode: 'end_lab',
    title: 'Return a full name',
    topic: 'methods',
    skillTags: ['methods', 'return types', 'strings'],
    prompt:
      'Complete getFullName. It should return firstName, a space, and lastName joined together.',
    starterCode: `public class NameHelper {
    public static String getFullName(String firstName, String lastName) {
        // TODO: return full name
    }
}`,
    expectedAnswers: [
      'public static String getFullName(String firstName, String lastName)',
      'return firstName + " " + lastName;',
    ],
    expectedPatterns: [
      'public\\s+static\\s+String\\s+getFullName\\s*\\(',
      'return\\s+firstName\\s*\\+\\s*"\\s+"\\s*\\+\\s*lastName\\s*;',
    ],
    hint: 'Because the method sends back text, the return type should be String.',
    explanation:
      'String return type means the method must return a String value to the caller.',
    difficulty: 'easy',
  },
  {
    id: 'lab-private-fields-customer-006',
    mode: 'end_lab',
    title: 'Create private Customer fields',
    topic: 'classes',
    skillTags: ['classes', 'private fields', 'Customer/Grocery'],
    prompt:
      'Fill in the missing private fields for a Customer. The shell is already provided.',
    starterCode: `public class Customer {
    // TODO: add private fields for name and rewardsPoints
}`,
    expectedPatterns: [
      'private\\s+String\\s+name\\s*;',
      'private\\s+int\\s+rewardsPoints\\s*;',
    ],
    hint: 'Fields store object data. Use private for object data.',
    explanation:
      'Customer data belongs inside the object, so the fields should be private.',
    difficulty: 'beginner',
  },
  {
    id: 'lab-constructor-grocery-007',
    mode: 'end_lab',
    title: 'Create a GroceryItem constructor',
    topic: 'constructors',
    skillTags: ['classes', 'constructors', 'Customer/Grocery'],
    prompt:
      'Complete the constructor so a GroceryItem starts with a name and price.',
    starterCode: `public class GroceryItem {
    private String name;
    private double price;

    // TODO: add constructor
}`,
    expectedPatterns: [
      'public\\s+GroceryItem\\s*\\(\\s*String\\s+name\\s*,\\s*double\\s+price\\s*\\)',
      'this\\.name\\s*=\\s*name\\s*;',
      'this\\.price\\s*=\\s*price\\s*;',
    ],
    hint: 'A constructor has the same name as the class and no return type.',
    explanation:
      'The constructor copies the parameter values into the object fields.',
    difficulty: 'easy',
  },
  {
    id: 'lab-getter-student-008',
    mode: 'end_lab',
    title: 'Create a Student getter',
    topic: 'getters',
    skillTags: ['classes', 'getters', 'Student/Course', 'return types'],
    prompt: 'Add a getter that returns the private grade field.',
    starterCode: `public class Student {
    private int grade;

    // TODO: add getGrade
}`,
    expectedPatterns: [
      'public\\s+int\\s+getGrade\\s*\\(\\s*\\)',
      'return\\s+grade\\s*;',
    ],
    hint: 'A getter sends a field value back to the caller.',
    explanation:
      'Because grade is an int, the getter return type should be int.',
    difficulty: 'beginner',
  },
  {
    id: 'lab-setter-product-009',
    mode: 'end_lab',
    title: 'Create a Product setter',
    topic: 'setters',
    skillTags: ['classes', 'setters', 'Inventory/Product', 'void'],
    prompt: 'Add a setter that updates the private quantity field.',
    starterCode: `public class Product {
    private int quantity;

    // TODO: add setQuantity
}`,
    visualizerType: 'class',
    visualizerData: {
      className: 'Product',
      fields: ['private int quantity'],
      constructors: [],
      methods: ['setQuantity(int quantity)'],
    },
    expectedPatterns: [
      'public\\s+void\\s+setQuantity\\s*\\(\\s*int\\s+quantity\\s*\\)',
      'this\\.quantity\\s*=\\s*quantity\\s*;',
    ],
    hint: 'A setter changes a field. It usually returns void.',
    explanation:
      'The method does a job by changing quantity, so void is the right return type.',
    difficulty: 'beginner',
  },
  {
    id: 'lab-create-array-scores-010',
    mode: 'end_lab',
    title: 'Create an int array',
    topic: 'arrays',
    skillTags: ['arrays', 'create arrays'],
    prompt: 'Inside the method, create an int array named scores with 3 values.',
    starterCode: `public class ScoreLab {
    public static int[] makeScores() {
        // TODO: create and return scores
    }
}`,
    visualizerType: 'array',
    visualizerData: {
      values: [85, 92, 78],
      operation: 'int[] scores = {85, 92, 78};',
    },
    expectedPatterns: [
      'int\\s*\\[\\]\\s+scores\\s*=\\s*\\{\\s*\\d+\\s*,\\s*\\d+\\s*,\\s*\\d+\\s*\\}',
      'return\\s+scores\\s*;',
    ],
    hint: 'An int array can look like int[] scores = {80, 90, 100};',
    explanation:
      'The method returns the whole array, so the return type is int[].',
    difficulty: 'easy',
  },
  {
    id: 'lab-loop-array-print-011',
    mode: 'end_lab',
    title: 'Loop through an array',
    topic: 'arrays',
    skillTags: ['arrays', 'loops', 'void'],
    prompt: 'Complete printScores so it prints each score in the array.',
    starterCode: `public class ScoreLab {
    public static void printScores(int[] scores) {
        // TODO: loop and print each score
    }
}`,
    expectedPatterns: [
      'public\\s+static\\s+void\\s+printScores\\s*\\(\\s*int\\[\\]\\s+scores\\s*\\)',
      'for\\s*\\(',
      'System\\.out\\.println\\s*\\(',
    ],
    hint: 'Use a loop. This method prints but does not return a value.',
    explanation:
      'Printing is an action, so this method can be void.',
    difficulty: 'easy',
  },
  {
    id: 'lab-sum-array-prices-012',
    mode: 'end_lab',
    title: 'Sum array values',
    topic: 'arrays',
    skillTags: ['arrays', 'loops', 'sum array values', 'return types'],
    prompt: 'Complete totalPrices so it returns the sum of all prices.',
    starterCode: `public class PriceLab {
    public static double totalPrices(double[] prices) {
        // TODO: sum prices
    }
}`,
    expectedPatterns: [
      'double\\s+total\\s*=\\s*0(\\.0)?',
      'for\\s*\\(',
      'total\\s*\\+=',
      'return\\s+total\\s*;',
    ],
    hint: 'Start total at 0, add each value, then return total.',
    explanation:
      'The method calculates a double total and sends it back with return.',
    difficulty: 'easy',
  },
  {
    id: 'lab-smallest-array-013',
    mode: 'end_lab',
    title: 'Find smallest array value',
    topic: 'arrays',
    skillTags: ['arrays', 'loops', 'find smallest array value'],
    prompt: 'Complete findSmallest so it returns the smallest number in values.',
    starterCode: `public class NumberLab {
    public static int findSmallest(int[] values) {
        // TODO: find smallest
    }
}`,
    visualizerType: 'array',
    visualizerData: {
      values: [12, 4, 19],
      operation: 'Start with index 0, then look for a smaller value.',
    },
    expectedPatterns: [
      'int\\s+smallest\\s*=\\s*values\\s*\\[\\s*0\\s*\\]',
      'for\\s*\\(',
      'values\\s*\\[.*\\]\\s*<\\s*smallest|value\\s*<\\s*smallest',
      'return\\s+smallest\\s*;',
    ],
    hint: 'Start with values[0] as the smallest, then compare each value.',
    explanation:
      'The first item is a safe starting value because it came from the array.',
    difficulty: 'medium',
  },
  {
    id: 'lab-largest-array-014',
    mode: 'end_lab',
    title: 'Find largest array value',
    topic: 'arrays',
    skillTags: ['arrays', 'loops', 'find largest array value'],
    prompt: 'Complete findLargest so it returns the largest number in values.',
    starterCode: `public class NumberLab {
    public static int findLargest(int[] values) {
        // TODO: find largest
    }
}`,
    expectedPatterns: [
      'int\\s+largest\\s*=\\s*values\\s*\\[\\s*0\\s*\\]',
      'for\\s*\\(',
      'values\\s*\\[.*\\]\\s*>\\s*largest|value\\s*>\\s*largest',
      'return\\s+largest\\s*;',
    ],
    hint: 'Use values[0] as your first largest value.',
    explanation:
      'The loop checks each item and updates largest when it finds a bigger number.',
    difficulty: 'medium',
  },
  {
    id: 'lab-average-array-015',
    mode: 'end_lab',
    title: 'Calculate average score',
    topic: 'arrays',
    skillTags: ['arrays', 'loops', 'calculate average', 'return types'],
    prompt: 'Complete average so it returns the average of all scores.',
    starterCode: `public class ScoreLab {
    public static double average(int[] scores) {
        // TODO: calculate average
    }
}`,
    expectedPatterns: [
      'for\\s*\\(',
      'total\\s*\\+=',
      'return\\s+.*\\/\\s*scores\\.length',
    ],
    hint: 'Average means total divided by the number of items.',
    explanation:
      'The result can be a decimal, so double is the best return type.',
    difficulty: 'medium',
  },
  {
    id: 'lab-arraylist-string-016',
    mode: 'end_lab',
    title: 'Create ArrayList<String>',
    topic: 'ArrayLists',
    skillTags: ['ArrayLists', 'Create ArrayList<String>'],
    prompt: 'Complete makeNames so it creates and returns an ArrayList<String>.',
    starterCode: `import java.util.ArrayList;

public class NameLab {
    public static ArrayList<String> makeNames() {
        // TODO: create names list and return it
    }
}`,
    visualizerType: 'arraylist',
    visualizerData: {
      values: ['Kai', 'Lee'],
      operation: 'ArrayList<String> can grow as names are added.',
    },
    expectedPatterns: [
      'ArrayList\\s*<\\s*String\\s*>\\s+names\\s*=\\s*new\\s+ArrayList\\s*<\\s*\\>',
      'return\\s+names\\s*;',
    ],
    hint: 'Use ArrayList<String> for a list of text values.',
    explanation:
      'ArrayList<String> means the list stores String values.',
    difficulty: 'easy',
  },
  {
    id: 'lab-arraylist-integer-017',
    mode: 'end_lab',
    title: 'Create ArrayList<Integer>',
    topic: 'ArrayLists',
    skillTags: ['ArrayLists', 'Create ArrayList<Integer>'],
    prompt: 'Complete makeScores so it creates and returns an ArrayList<Integer>.',
    starterCode: `import java.util.ArrayList;

public class ScoreListLab {
    public static ArrayList<Integer> makeScores() {
        // TODO: create scores list and return it
    }
}`,
    expectedPatterns: [
      'ArrayList\\s*<\\s*Integer\\s*>\\s+scores\\s*=\\s*new\\s+ArrayList\\s*<\\s*\\>',
      'return\\s+scores\\s*;',
    ],
    hint: 'Use Integer, not int, inside ArrayList angle brackets.',
    explanation:
      'ArrayList uses wrapper types, so numbers use Integer instead of int.',
    difficulty: 'easy',
  },
  {
    id: 'lab-arraylist-custom-objects-018',
    mode: 'end_lab',
    title: 'Create ArrayList of Products',
    topic: 'ArrayLists',
    skillTags: ['ArrayLists', 'Create ArrayList custom objects', 'Inventory/Product'],
    prompt: 'Complete makeProducts so it creates a list that stores Product objects.',
    starterCode: `import java.util.ArrayList;

public class Inventory {
    public ArrayList<Product> makeProducts() {
        // TODO: create products list and return it
    }
}`,
    expectedPatterns: [
      'ArrayList\\s*<\\s*Product\\s*>\\s+products\\s*=\\s*new\\s+ArrayList\\s*<\\s*\\>',
      'return\\s+products\\s*;',
    ],
    hint: 'Put the class name inside the angle brackets.',
    explanation:
      'ArrayList<Product> means every item in the list should be a Product object.',
    difficulty: 'easy',
  },
  {
    id: 'lab-add-object-arraylist-019',
    mode: 'end_lab',
    title: 'Add object to ArrayList',
    topic: 'ArrayLists',
    skillTags: ['ArrayLists', 'Add object to ArrayList', 'Inventory/Product', 'void'],
    prompt: 'Complete addProduct so it adds the Product object to products.',
    starterCode: `import java.util.ArrayList;

public class Inventory {
    private ArrayList<Product> products = new ArrayList<>();

    public void addProduct(Product product) {
        // TODO: add product to products
    }
}`,
    visualizerType: 'arraylist',
    visualizerData: {
      values: ['Product A', 'Product B'],
      operation: 'products.add(product) adds the object to the end.',
    },
    expectedPatterns: [
      'public\\s+void\\s+addProduct\\s*\\(\\s*Product\\s+product\\s*\\)',
      'products\\.add\\s*\\(\\s*product\\s*\\)\\s*;',
    ],
    hint: 'ArrayList has an add method.',
    explanation:
      'The method changes the list and does not need to return anything.',
    difficulty: 'easy',
  },
  {
    id: 'lab-return-arraylist-getter-020',
    mode: 'end_lab',
    title: 'Return ArrayList from getter',
    topic: 'getters',
    skillTags: ['ArrayLists', 'Return ArrayList from getter', 'Book/Library'],
    prompt: 'Complete getBooks so it returns the private books list.',
    starterCode: `import java.util.ArrayList;

public class Library {
    private ArrayList<Book> books = new ArrayList<>();

    // TODO: add getBooks
}`,
    expectedPatterns: [
      'public\\s+ArrayList\\s*<\\s*Book\\s*>\\s+getBooks\\s*\\(\\s*\\)',
      'return\\s+books\\s*;',
    ],
    hint: 'The return type should match the field type.',
    explanation:
      'A getter can return an ArrayList just like it can return an int or String.',
    difficulty: 'easy',
  },
  {
    id: 'lab-pass-object-method-021',
    mode: 'end_lab',
    title: 'Pass object into method',
    topic: 'methods',
    skillTags: ['methods', 'Pass object into method', 'Dog/Pet', 'void'],
    prompt: 'Complete printPetName. It receives a Pet object and prints its name.',
    starterCode: `public class PetPrinter {
    public static void printPetName(Pet pet) {
        // TODO: print pet name
    }
}`,
    expectedPatterns: [
      'public\\s+static\\s+void\\s+printPetName\\s*\\(\\s*Pet\\s+pet\\s*\\)',
      'System\\.out\\.println\\s*\\(\\s*pet\\.getName\\s*\\(\\s*\\)\\s*\\)',
    ],
    hint: 'Use the object variable, then call its getter with dot syntax.',
    explanation:
      'Passing an object into a method lets the method use that object.',
    difficulty: 'easy',
  },
  {
    id: 'lab-void-method-dog-022',
    mode: 'end_lab',
    title: 'Write void method',
    topic: 'methods',
    skillTags: ['methods', 'Write void method', 'Dog/Pet', 'void'],
    prompt: 'Complete celebrateBirthday so it increases age by 1 and returns nothing.',
    starterCode: `public class Dog {
    private int age;

    public void celebrateBirthday() {
        // TODO: increase age by 1
    }
}`,
    expectedPatterns: [
      'public\\s+void\\s+celebrateBirthday\\s*\\(\\s*\\)',
      'age\\s*\\+\\+|age\\s*=\\s*age\\s*\\+\\s*1',
    ],
    hint: 'This method changes a field. It does not give an answer back.',
    explanation:
      'Use void when the method performs an action and returns no value.',
    difficulty: 'easy',
  },
  {
    id: 'lab-return-int-course-023',
    mode: 'end_lab',
    title: 'Write method that returns int',
    topic: 'methods',
    skillTags: ['methods', 'return types', 'Write method that returns int', 'Student/Course'],
    prompt: 'Complete getStudentCount so it returns the number of students.',
    starterCode: `public class Course {
    private int studentCount;

    public int getStudentCount() {
        // TODO: return studentCount
    }
}`,
    expectedPatterns: [
      'public\\s+int\\s+getStudentCount\\s*\\(\\s*\\)',
      'return\\s+studentCount\\s*;',
    ],
    hint: 'The value is an int, so the method return type is int.',
    explanation:
      'A method that gives an integer answer back uses int before the method name.',
    difficulty: 'beginner',
  },
  {
    id: 'lab-return-double-product-024',
    mode: 'end_lab',
    title: 'Write method that returns double',
    topic: 'methods',
    skillTags: ['methods', 'return types', 'Write method that returns double', 'Inventory/Product'],
    prompt: 'Complete getTotalValue so it returns price times quantity.',
    starterCode: `public class Product {
    private double price;
    private int quantity;

    public double getTotalValue() {
        // TODO: return price times quantity
    }
}`,
    expectedPatterns: [
      'public\\s+double\\s+getTotalValue\\s*\\(\\s*\\)',
      'return\\s+price\\s*\\*\\s*quantity\\s*;',
    ],
    hint: 'price is a double, so the result should be a double.',
    explanation:
      'The method calculates a decimal value and returns it to the caller.',
    difficulty: 'easy',
  },
  {
    id: 'lab-return-string-book-025',
    mode: 'end_lab',
    title: 'Write method that returns String',
    topic: 'methods',
    skillTags: ['methods', 'return types', 'Write method that returns String', 'Book/Library'],
    prompt: 'Complete getLabel so it returns title + " by " + author.',
    starterCode: `public class Book {
    private String title;
    private String author;

    public String getLabel() {
        // TODO: return label
    }
}`,
    expectedPatterns: [
      'public\\s+String\\s+getLabel\\s*\\(\\s*\\)',
      'return\\s+title\\s*\\+\\s*"\\s+by\\s+"\\s*\\+\\s*author\\s*;',
    ],
    hint: 'Text uses String as the return type.',
    explanation:
      'The method joins two String fields with extra text and returns the result.',
    difficulty: 'easy',
  },
  {
    id: 'lab-customer-grocery-total-026',
    mode: 'end_lab',
    title: 'Customer grocery total',
    topic: 'Customer/Grocery',
    skillTags: ['Customer/Grocery', 'classes', 'constructors', 'getters'],
    prompt:
      'Complete the GroceryOrder constructor and getTotal method for a simple grocery order.',
    starterCode: `public class GroceryOrder {
    private String customerName;
    private double total;

    // TODO: constructor

    // TODO: getTotal
}`,
    expectedPatterns: [
      'public\\s+GroceryOrder\\s*\\(\\s*String\\s+customerName\\s*,\\s*double\\s+total\\s*\\)',
      'this\\.customerName\\s*=\\s*customerName\\s*;',
      'this\\.total\\s*=\\s*total\\s*;',
      'public\\s+double\\s+getTotal\\s*\\(\\s*\\)',
      'return\\s+total\\s*;',
    ],
    hint: 'Constructor first, then a getter that returns the total.',
    explanation:
      'This combines the common class pattern: private fields, constructor, getter.',
    difficulty: 'medium',
  },
  {
    id: 'lab-student-course-list-027',
    mode: 'end_lab',
    title: 'Student and Course roster',
    topic: 'Student/Course',
    skillTags: ['Student/Course', 'ArrayLists', 'Add object to ArrayList', 'Return ArrayList from getter'],
    prompt:
      'Complete Course by creating the students list, adding a student, and returning the list.',
    starterCode: `import java.util.ArrayList;

public class Course {
    // TODO: private ArrayList<Student> field

    public void addStudent(Student student) {
        // TODO: add student
    }

    public ArrayList<Student> getStudents() {
        // TODO: return students
    }
}`,
    expectedPatterns: [
      'private\\s+ArrayList\\s*<\\s*Student\\s*>\\s+students\\s*=\\s*new\\s+ArrayList\\s*<\\s*\\>',
      'students\\.add\\s*\\(\\s*student\\s*\\)\\s*;',
      'return\\s+students\\s*;',
    ],
    hint: 'The list stores Student objects, not String names.',
    explanation:
      'A Course can own an ArrayList of Student objects and expose it with a getter.',
    difficulty: 'medium',
  },
  {
    id: 'lab-inventory-product-count-028',
    mode: 'end_lab',
    title: 'Inventory product count',
    topic: 'Inventory/Product',
    skillTags: ['Inventory/Product', 'ArrayLists', 'methods', 'return types'],
    prompt: 'Complete getProductCount so it returns how many products are in inventory.',
    starterCode: `import java.util.ArrayList;

public class Inventory {
    private ArrayList<Product> products = new ArrayList<>();

    public int getProductCount() {
        // TODO: return list size
    }
}`,
    expectedPatterns: [
      'public\\s+int\\s+getProductCount\\s*\\(\\s*\\)',
      'return\\s+products\\.size\\s*\\(\\s*\\)\\s*;',
    ],
    hint: 'ArrayList uses size() to count items.',
    explanation:
      'ArrayList size() returns an int, so this method returns int.',
    difficulty: 'easy',
  },
  {
    id: 'lab-dog-pet-constructor-029',
    mode: 'end_lab',
    title: 'Dog/Pet constructor',
    topic: 'Dog/Pet',
    skillTags: ['Dog/Pet', 'classes', 'constructors', 'private fields'],
    prompt: 'Complete the Pet class with fields, constructor, and getName.',
    starterCode: `public class Pet {
    // TODO: private name and type fields

    // TODO: constructor

    // TODO: getName
}`,
    expectedPatterns: [
      'private\\s+String\\s+name\\s*;',
      'private\\s+String\\s+type\\s*;',
      'public\\s+Pet\\s*\\(\\s*String\\s+name\\s*,\\s*String\\s+type\\s*\\)',
      'this\\.name\\s*=\\s*name\\s*;',
      'this\\.type\\s*=\\s*type\\s*;',
      'public\\s+String\\s+getName\\s*\\(\\s*\\)',
    ],
    hint: 'Pet stores two String fields. The getter returns name.',
    explanation:
      'This is a typical object problem: fields store state, constructor fills state, getter reads state.',
    difficulty: 'medium',
  },
  {
    id: 'lab-book-library-add-030',
    mode: 'end_lab',
    title: 'Book/Library add book',
    topic: 'Book/Library',
    skillTags: ['Book/Library', 'ArrayLists', 'Add object to ArrayList', 'void'],
    prompt: 'Complete addBook so the Library stores the Book object it receives.',
    starterCode: `import java.util.ArrayList;

public class Library {
    private ArrayList<Book> books = new ArrayList<>();

    public void addBook(Book book) {
        // TODO: add book
    }
}`,
    expectedPatterns: [
      'public\\s+void\\s+addBook\\s*\\(\\s*Book\\s+book\\s*\\)',
      'books\\.add\\s*\\(\\s*book\\s*\\)\\s*;',
    ],
    hint: 'Use books.add(book); inside the method.',
    explanation:
      'The method changes the Library object by adding to its books list.',
    difficulty: 'easy',
  },
  {
    id: 'lab-book-library-find-title-031',
    mode: 'end_lab',
    title: 'Find a book title',
    topic: 'Book/Library',
    skillTags: ['Book/Library', 'ArrayLists', 'loops', 'return types'],
    prompt:
      'Complete findTitle. Return the first book title that matches targetTitle, or "Not found".',
    starterCode: `import java.util.ArrayList;

public class Library {
    private ArrayList<Book> books = new ArrayList<>();

    public String findTitle(String targetTitle) {
        // TODO: loop through books
    }
}`,
    expectedPatterns: [
      'public\\s+String\\s+findTitle\\s*\\(\\s*String\\s+targetTitle\\s*\\)',
      'for\\s*\\(',
      '\\.equals\\s*\\(\\s*targetTitle\\s*\\)',
      'return\\s+.*getTitle\\s*\\(\\s*\\)',
      'return\\s+"Not found"\\s*;',
    ],
    hint: 'Use equals for String comparison.',
    explanation:
      'String values should be compared with equals, not ==.',
    difficulty: 'medium',
  },
  {
    id: 'lab-course-average-grade-032',
    mode: 'end_lab',
    title: 'Course average grade',
    topic: 'Student/Course',
    skillTags: ['Student/Course', 'ArrayLists', 'loops', 'calculate average'],
    prompt: 'Complete averageGrade so it returns the average grade for students.',
    starterCode: `import java.util.ArrayList;

public class Course {
    private ArrayList<Student> students = new ArrayList<>();

    public double averageGrade() {
        // TODO: average student grades
    }
}`,
    expectedPatterns: [
      'public\\s+double\\s+averageGrade\\s*\\(\\s*\\)',
      'for\\s*\\(',
      'getGrade\\s*\\(\\s*\\)',
      'return\\s+.*\\/\\s*students\\.size\\s*\\(\\s*\\)',
    ],
    hint: 'Add each student grade, then divide by students.size().',
    explanation:
      'A list average is the same idea as an array average, but ArrayList uses size().',
    difficulty: 'medium',
  },
  {
    id: 'lab-grocery-cart-total-033',
    mode: 'end_lab',
    title: 'Grocery cart total',
    topic: 'Customer/Grocery',
    skillTags: ['Customer/Grocery', 'ArrayLists', 'loops', 'sum array values'],
    prompt: 'Complete cartTotal so it adds up each GroceryItem price.',
    starterCode: `import java.util.ArrayList;

public class GroceryCart {
    private ArrayList<GroceryItem> items = new ArrayList<>();

    public double cartTotal() {
        // TODO: total item prices
    }
}`,
    expectedPatterns: [
      'double\\s+total\\s*=\\s*0(\\.0)?',
      'for\\s*\\(',
      'getPrice\\s*\\(\\s*\\)',
      'return\\s+total\\s*;',
    ],
    hint: 'Loop through items and add each item price to total.',
    explanation:
      'This is a common lab pattern: list, loop, add values, return total.',
    difficulty: 'medium',
  },
  {
    id: 'lab-product-price-setter-034',
    mode: 'end_lab',
    title: 'Product price setter',
    topic: 'Inventory/Product',
    skillTags: ['Inventory/Product', 'setters', 'void', 'public/private'],
    prompt: 'Complete setPrice so outside code can update the private price.',
    starterCode: `public class Product {
    private double price;

    public void setPrice(double price) {
        // TODO: update price
    }
}`,
    expectedPatterns: [
      'public\\s+void\\s+setPrice\\s*\\(\\s*double\\s+price\\s*\\)',
      'this\\.price\\s*=\\s*price\\s*;',
    ],
    hint: 'Use this.price for the field and price for the parameter.',
    explanation:
      'The setter is public so other classes can call it, and void because it returns nothing.',
    difficulty: 'beginner',
  },
  {
    id: 'lab-pet-name-getter-setter-035',
    mode: 'end_lab',
    title: 'Pet getter and setter',
    topic: 'Dog/Pet',
    skillTags: ['Dog/Pet', 'getters', 'setters', 'private fields'],
    prompt: 'Complete getName and setName for the Pet class.',
    starterCode: `public class Pet {
    private String name;

    // TODO: getName

    // TODO: setName
}`,
    expectedPatterns: [
      'public\\s+String\\s+getName\\s*\\(\\s*\\)',
      'return\\s+name\\s*;',
      'public\\s+void\\s+setName\\s*\\(\\s*String\\s+name\\s*\\)',
      'this\\.name\\s*=\\s*name\\s*;',
    ],
    hint: 'Getter returns. Setter changes.',
    explanation:
      'The getter has a String return type. The setter uses void.',
    difficulty: 'easy',
  },
]

const supplementalPaoaQuestions: Question[] = [
  {
    id: 'pa-variables-006',
    mode: 'pa',
    title: 'Pick the correct variable declaration',
    topic: 'variables',
    skillTags: ['variables', 'data types', 'compile errors'],
    prompt: 'A lab needs a whole-number count named total. Which line is correct Java?',
    choices: [
      { id: 'a', text: 'int total = 0;' },
      { id: 'b', text: 'integer total = 0;' },
      { id: 'c', text: 'num total = 0;' },
      { id: 'd', text: 'total int = 0;' },
    ],
    correctChoiceId: 'a',
    hint: 'Java type comes before the variable name.',
    explanation: 'Use int for whole numbers. Java declarations use type, name, equals, value.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-data-types-007',
    mode: 'pa',
    title: 'Choose the best data type',
    topic: 'data types',
    skillTags: ['data types', 'double', 'variables'],
    prompt: 'A price can include cents. Which type should you usually choose?',
    choices: [
      { id: 'a', text: 'int' },
      { id: 'b', text: 'double' },
      { id: 'c', text: 'boolean' },
      { id: 'd', text: 'char' },
    ],
    correctChoiceId: 'b',
    hint: 'Cents need decimal places.',
    explanation: 'double stores decimal numbers, such as 12.99.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-arithmetic-008',
    mode: 'pa',
    title: 'Arithmetic expression',
    topic: 'arithmetic',
    skillTags: ['arithmetic', 'variables'],
    prompt: 'Given int total = 4 + 3 * 2; what is total?',
    choices: [
      { id: 'a', text: '14' },
      { id: 'b', text: '10' },
      { id: 'c', text: '11' },
      { id: 'd', text: '7' },
    ],
    correctChoiceId: 'b',
    hint: 'Multiplication happens before addition.',
    explanation: 'Java calculates 3 * 2 first, then adds 4, so the result is 10.',
    difficulty: 'easy',
  },
  {
    id: 'pa-integer-division-009',
    mode: 'pa',
    title: 'Integer division result',
    topic: 'integer division',
    skillTags: ['arithmetic', 'integer division', 'data types'],
    prompt: 'Given int answer = 7 / 2; what value is stored?',
    choices: [
      { id: 'a', text: '3' },
      { id: 'b', text: '3.5' },
      { id: 'c', text: '4' },
      { id: 'd', text: '2' },
    ],
    correctChoiceId: 'a',
    hint: 'int division drops the decimal part.',
    explanation: 'When both numbers are int, Java keeps only the whole-number part.',
    difficulty: 'easy',
  },
  {
    id: 'pa-string-compare-010',
    mode: 'pa',
    title: 'Compare Strings',
    topic: 'strings',
    skillTags: ['strings', 'if/else', 'common compile errors'],
    prompt: 'Which line correctly checks whether name has the text "Ava"?',
    choices: [
      { id: 'a', text: 'if (name.equals("Ava"))' },
      { id: 'b', text: 'if (name = "Ava")' },
      { id: 'c', text: 'if name equals "Ava"' },
      { id: 'd', text: 'if (name == new "Ava")' },
    ],
    correctChoiceId: 'a',
    hint: 'Use equals for String text comparison.',
    explanation: 'String values should be compared with .equals(...) in beginner Java labs.',
    difficulty: 'easy',
  },
  {
    id: 'pa-char-011',
    mode: 'pa',
    title: 'Char literal',
    topic: 'char',
    skillTags: ['char', 'data types', 'compile errors'],
    prompt: 'Which line correctly stores the letter A in a char variable?',
    choices: [
      { id: 'a', text: "char grade = 'A';" },
      { id: 'b', text: 'char grade = "A";' },
      { id: 'c', text: 'String grade = A;' },
      { id: 'd', text: "char grade = 'AB';" },
    ],
    correctChoiceId: 'a',
    hint: 'char uses single quotes and one character.',
    explanation: 'A char stores one character in single quotes, like \'A\'.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-boolean-012',
    mode: 'pa',
    title: 'Boolean value',
    topic: 'boolean',
    skillTags: ['boolean', 'if/else'],
    prompt: 'Which assignment is valid for a boolean variable?',
    choices: [
      { id: 'a', text: 'boolean isPassing = true;' },
      { id: 'b', text: 'boolean isPassing = "true";' },
      { id: 'c', text: 'boolean isPassing = yes;' },
      { id: 'd', text: 'boolean isPassing = 1.5;' },
    ],
    correctChoiceId: 'a',
    hint: 'boolean uses true or false without quotes.',
    explanation: 'true and false are Java boolean literals.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-if-else-013',
    mode: 'pa',
    title: 'Choose if/else condition',
    topic: 'if/else',
    skillTags: ['if/else', 'boolean', 'operators'],
    prompt: 'A score passes when it is 70 or higher. Which condition is right?',
    choices: [
      { id: 'a', text: 'score >= 70' },
      { id: 'b', text: 'score => 70' },
      { id: 'c', text: 'score = 70' },
      { id: 'd', text: 'score >== 70' },
    ],
    correctChoiceId: 'a',
    hint: 'Greater than or equal is >=.',
    explanation: 'score >= 70 is true for 70, 71, 80, and so on.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-switch-014',
    mode: 'pa',
    title: 'Switch case keyword',
    topic: 'switch',
    skillTags: ['switch', 'control flow'],
    prompt: 'Inside a switch statement, which keyword marks one possible value?',
    choices: [
      { id: 'a', text: 'case' },
      { id: 'b', text: 'if' },
      { id: 'c', text: 'option' },
      { id: 'd', text: 'when' },
    ],
    correctChoiceId: 'a',
    hint: 'switch uses case labels.',
    explanation: 'A switch checks a value against case labels.',
    difficulty: 'easy',
  },
  {
    id: 'pa-while-loop-015',
    mode: 'pa',
    title: 'While loop update',
    topic: 'while loops',
    skillTags: ['while loops', 'loops', 'compile errors'],
    prompt: 'What is the most likely problem if a while loop condition never becomes false?',
    choices: [
      { id: 'a', text: 'The loop may run forever.' },
      { id: 'b', text: 'The code will always skip the loop.' },
      { id: 'c', text: 'Java changes it to a for loop.' },
      { id: 'd', text: 'The variable becomes private.' },
    ],
    correctChoiceId: 'a',
    hint: 'A loop needs progress toward stopping.',
    explanation: 'If the condition stays true, the while loop keeps running.',
    difficulty: 'easy',
  },
  {
    id: 'pa-for-loop-016',
    mode: 'pa',
    title: 'For loop array indexes',
    topic: 'for loops',
    skillTags: ['for loops', 'arrays', 'index'],
    prompt: 'Which loop visits every index in int[] nums?',
    choices: [
      { id: 'a', text: 'for (int i = 0; i < nums.length; i++)' },
      { id: 'b', text: 'for (int i = 1; i <= nums.length; i++)' },
      { id: 'c', text: 'for (int i = 0; i <= nums.length; i++)' },
      { id: 'd', text: 'for nums in i' },
    ],
    correctChoiceId: 'a',
    hint: 'Indexes start at 0 and stop before length.',
    explanation: 'The last valid index is nums.length - 1, so use i < nums.length.',
    difficulty: 'easy',
  },
  {
    id: 'pa-array-index-017',
    mode: 'pa',
    title: 'Array index access',
    topic: 'arrays',
    skillTags: ['arrays', 'index'],
    prompt: 'Given String[] names = {"Ava", "Ben"}; what is names[1]?',
    choices: [
      { id: 'a', text: 'Ava' },
      { id: 'b', text: 'Ben' },
      { id: 'c', text: '1' },
      { id: 'd', text: 'It will not compile.' },
    ],
    correctChoiceId: 'b',
    hint: 'Index 0 is first. Index 1 is second.',
    explanation: 'names[1] is the second value, "Ben".',
    difficulty: 'beginner',
    visualizerType: 'array',
    visualizerData: { values: ['Ava', 'Ben'], operation: 'names[1] points to Ben.' },
  },
  {
    id: 'pa-arraylist-size-018',
    mode: 'pa',
    title: 'ArrayList size',
    topic: 'ArrayLists',
    skillTags: ['ArrayLists', 'methods'],
    prompt: 'Which method returns how many items are in an ArrayList named names?',
    choices: [
      { id: 'a', text: 'names.length' },
      { id: 'b', text: 'names.size()' },
      { id: 'c', text: 'names.count' },
      { id: 'd', text: 'names.total()' },
    ],
    correctChoiceId: 'b',
    hint: 'ArrayList uses a method, not a field.',
    explanation: 'ArrayList uses size(). Arrays use length.',
    difficulty: 'easy',
    visualizerType: 'arraylist',
    visualizerData: { values: ['Ava', 'Ben', 'Cam'], operation: 'names.size() is 3.' },
  },
  {
    id: 'pa-method-parameter-019',
    mode: 'pa',
    title: 'Find the parameter',
    topic: 'parameters',
    skillTags: ['methods', 'parameters'],
    prompt: 'In public void setAge(int age), what is age?',
    choices: [
      { id: 'a', text: 'A parameter' },
      { id: 'b', text: 'A constructor' },
      { id: 'c', text: 'A class' },
      { id: 'd', text: 'A package' },
    ],
    correctChoiceId: 'a',
    hint: 'It is listed inside the method parentheses.',
    explanation: 'A parameter receives a value when the method is called.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-return-type-020',
    mode: 'pa',
    title: 'Method return type',
    topic: 'return types',
    skillTags: ['methods', 'return types'],
    prompt: 'Which method header says the method returns a String?',
    choices: [
      { id: 'a', text: 'public String getName()' },
      { id: 'b', text: 'public void getName()' },
      { id: 'c', text: 'public getName(String)' },
      { id: 'd', text: 'private return getName()' },
    ],
    correctChoiceId: 'a',
    hint: 'The return type appears before the method name.',
    explanation: 'String before getName means the method must return a String.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-void-021',
    mode: 'pa',
    title: 'When to use void',
    topic: 'void',
    skillTags: ['methods', 'void', 'setters'],
    prompt: 'A method updates a field and returns nothing. What return type should it use?',
    choices: [
      { id: 'a', text: 'void' },
      { id: 'b', text: 'int' },
      { id: 'c', text: 'String' },
      { id: 'd', text: 'return' },
    ],
    correctChoiceId: 'a',
    hint: 'No value comes back.',
    explanation: 'Use void when the method does a job but does not give back a value.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-public-private-022',
    mode: 'pa',
    title: 'Private fields, public methods',
    topic: 'public/private',
    skillTags: ['public/private', 'classes', 'private fields'],
    prompt: 'Which design is most common for a simple D286 class?',
    choices: [
      { id: 'a', text: 'private fields and public getters/setters' },
      { id: 'b', text: 'public fields and private getters' },
      { id: 'c', text: 'no fields and only comments' },
      { id: 'd', text: 'private class name and public variables' },
    ],
    correctChoiceId: 'a',
    hint: 'Protect data, expose safe methods.',
    explanation: 'Fields usually stay private. Methods used by other classes are often public.',
    difficulty: 'easy',
  },
  {
    id: 'pa-class-object-023',
    mode: 'pa',
    title: 'Class versus object',
    topic: 'objects',
    skillTags: ['classes', 'objects'],
    prompt: 'Which line creates an object from the Student class?',
    choices: [
      { id: 'a', text: 'Student s = new Student();' },
      { id: 'b', text: 'class Student = new s();' },
      { id: 'c', text: 'new class Student();' },
      { id: 'd', text: 'Student.new(s);' },
    ],
    correctChoiceId: 'a',
    hint: 'Use new ClassName(...).',
    explanation: 'new Student() creates one Student object.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-constructor-024',
    mode: 'pa',
    title: 'Constructor rule',
    topic: 'constructors',
    skillTags: ['constructors', 'classes', 'compile errors'],
    prompt: 'Which statement about constructors is true?',
    choices: [
      { id: 'a', text: 'A constructor has the same name as the class.' },
      { id: 'b', text: 'A constructor must return void.' },
      { id: 'c', text: 'A constructor is always private.' },
      { id: 'd', text: 'A constructor cannot have parameters.' },
    ],
    correctChoiceId: 'a',
    hint: 'Constructor name matches class name.',
    explanation: 'Constructors have no return type and use the class name.',
    difficulty: 'easy',
  },
  {
    id: 'pa-getter-setter-025',
    mode: 'pa',
    title: 'Getter or setter',
    topic: 'getters/setters',
    skillTags: ['getters', 'setters', 'methods'],
    prompt: 'Which method is a getter?',
    choices: [
      { id: 'a', text: 'public int getScore() { return score; }' },
      { id: 'b', text: 'public void setScore(int score) { this.score = score; }' },
      { id: 'c', text: 'public Score class()' },
      { id: 'd', text: 'private void score;' },
    ],
    correctChoiceId: 'a',
    hint: 'A getter returns a value.',
    explanation: 'getScore returns the score field, so it is a getter.',
    difficulty: 'easy',
  },
  {
    id: 'pa-compile-missing-semicolon-026',
    mode: 'pa',
    title: 'Missing semicolon',
    topic: 'common compile errors',
    skillTags: ['compile errors', 'variables'],
    prompt: 'Which line is missing a required semicolon?',
    choices: [
      { id: 'a', text: 'int count = 0' },
      { id: 'b', text: 'if (count > 0) {' },
      { id: 'c', text: 'public class Main {' },
      { id: 'd', text: '} else {' },
    ],
    correctChoiceId: 'a',
    hint: 'Variable assignment statements end with semicolons.',
    explanation: 'int count = 0 needs a semicolon at the end.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-compile-braces-027',
    mode: 'pa',
    title: 'Curly braces',
    topic: 'common compile errors',
    skillTags: ['compile errors', 'classes', 'methods'],
    prompt: 'What do curly braces usually mark in Java?',
    choices: [
      { id: 'a', text: 'The start and end of a block of code' },
      { id: 'b', text: 'Only String values' },
      { id: 'c', text: 'Only array indexes' },
      { id: 'd', text: 'A decimal number' },
    ],
    correctChoiceId: 'a',
    hint: 'Classes, methods, loops, and if statements use blocks.',
    explanation: 'Curly braces group the statements that belong together.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-array-length-028',
    mode: 'pa',
    title: 'Array length',
    topic: 'arrays',
    skillTags: ['arrays', 'loops'],
    prompt: 'Which expression gives the length of an array named scores?',
    choices: [
      { id: 'a', text: 'scores.length' },
      { id: 'b', text: 'scores.size()' },
      { id: 'c', text: 'scores.count()' },
      { id: 'd', text: 'length(scores)' },
    ],
    correctChoiceId: 'a',
    hint: 'Arrays use length without parentheses.',
    explanation: 'Array length is a field: scores.length.',
    difficulty: 'easy',
  },
  {
    id: 'pa-arraylist-import-029',
    mode: 'pa',
    title: 'ArrayList import',
    topic: 'ArrayLists',
    skillTags: ['ArrayLists', 'compile errors'],
    prompt: 'Which import is needed before using ArrayList?',
    choices: [
      { id: 'a', text: 'import java.util.ArrayList;' },
      { id: 'b', text: 'import java.array.ArrayList;' },
      { id: 'c', text: 'include ArrayList;' },
      { id: 'd', text: 'using java.util.ArrayList;' },
    ],
    correctChoiceId: 'a',
    hint: 'ArrayList is in java.util.',
    explanation: 'Use import java.util.ArrayList; at the top of the file.',
    difficulty: 'easy',
  },
  {
    id: 'pa-scope-this-030',
    mode: 'pa',
    title: 'Using this',
    topic: 'classes',
    skillTags: ['classes', 'constructors', 'setters'],
    prompt: 'In this.name = name; what does this.name usually mean?',
    choices: [
      { id: 'a', text: 'The field inside the current object' },
      { id: 'b', text: 'A new class' },
      { id: 'c', text: 'A package import' },
      { id: 'd', text: 'The return type' },
    ],
    correctChoiceId: 'a',
    hint: 'this points to the current object.',
    explanation: 'this.name refers to the object field, while name often refers to the parameter.',
    difficulty: 'easy',
  },
  {
    id: 'oa-variable-output-006',
    mode: 'oa',
    title: 'Variable output',
    topic: 'variables',
    skillTags: ['variables', 'arithmetic'],
    prompt: 'What prints? int x = 5; x = x + 2; System.out.println(x);',
    choices: [
      { id: 'a', text: '5' },
      { id: 'b', text: '7' },
      { id: 'c', text: '2' },
      { id: 'd', text: 'x + 2' },
    ],
    correctChoiceId: 'b',
    hint: 'x is updated before printing.',
    explanation: 'x starts as 5, then becomes 7.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-double-division-007',
    mode: 'oa',
    title: 'Double division',
    topic: 'data types',
    skillTags: ['data types', 'arithmetic', 'integer division'],
    prompt: 'What is 7.0 / 2?',
    choices: [
      { id: 'a', text: '3' },
      { id: 'b', text: '3.5' },
      { id: 'c', text: '4' },
      { id: 'd', text: '2.0' },
    ],
    correctChoiceId: 'b',
    hint: '7.0 is a double.',
    explanation: 'When one value is a double, Java keeps the decimal result.',
    difficulty: 'easy',
  },
  {
    id: 'oa-string-concat-008',
    mode: 'oa',
    title: 'String concatenation',
    topic: 'strings',
    skillTags: ['strings', 'arithmetic'],
    prompt: 'What is "Score: " + 90?',
    choices: [
      { id: 'a', text: 'Score: 90' },
      { id: 'b', text: 'Score: + 90' },
      { id: 'c', text: '90' },
      { id: 'd', text: 'This always fails.' },
    ],
    correctChoiceId: 'a',
    hint: 'A String plus a number makes text.',
    explanation: 'The number is joined onto the String.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-char-string-009',
    mode: 'oa',
    title: 'char versus String',
    topic: 'char',
    skillTags: ['char', 'strings', 'data types'],
    prompt: 'Which value is a String, not a char?',
    choices: [
      { id: 'a', text: '"A"' },
      { id: 'b', text: "'A'" },
      { id: 'c', text: "'B'" },
      { id: 'd', text: "'7'" },
    ],
    correctChoiceId: 'a',
    hint: 'Double quotes make a String.',
    explanation: '"A" is a String. \'A\' is a char.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-boolean-expression-010',
    mode: 'oa',
    title: 'Boolean expression',
    topic: 'boolean',
    skillTags: ['boolean', 'if/else'],
    prompt: 'If int age = 20; what is age >= 18?',
    choices: [
      { id: 'a', text: 'true' },
      { id: 'b', text: 'false' },
      { id: 'c', text: '20' },
      { id: 'd', text: '18' },
    ],
    correctChoiceId: 'a',
    hint: '20 is at least 18.',
    explanation: 'Comparison expressions produce boolean values: true or false.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-if-else-011',
    mode: 'oa',
    title: 'if/else path',
    topic: 'if/else',
    skillTags: ['if/else', 'boolean'],
    prompt: 'If score is 65, which branch runs? if (score >= 70) pass else retry',
    choices: [
      { id: 'a', text: 'pass' },
      { id: 'b', text: 'retry' },
      { id: 'c', text: 'both branches' },
      { id: 'd', text: 'neither branch' },
    ],
    correctChoiceId: 'b',
    hint: '65 is less than 70.',
    explanation: 'The condition is false, so the else branch runs.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-switch-break-012',
    mode: 'oa',
    title: 'switch break',
    topic: 'switch',
    skillTags: ['switch', 'control flow'],
    prompt: 'In a simple switch, why is break commonly used after a case?',
    choices: [
      { id: 'a', text: 'To stop running the switch after that case' },
      { id: 'b', text: 'To create an object' },
      { id: 'c', text: 'To return an ArrayList' },
      { id: 'd', text: 'To declare a private field' },
    ],
    correctChoiceId: 'a',
    hint: 'break exits the switch.',
    explanation: 'break prevents execution from continuing into later cases.',
    difficulty: 'easy',
  },
  {
    id: 'oa-while-loop-count-013',
    mode: 'oa',
    title: 'while loop count',
    topic: 'while loops',
    skillTags: ['while loops', 'loops'],
    prompt: 'How many times does this run? int i = 0; while (i < 3) { i++; }',
    choices: [
      { id: 'a', text: '0' },
      { id: 'b', text: '2' },
      { id: 'c', text: '3' },
      { id: 'd', text: '4' },
    ],
    correctChoiceId: 'c',
    hint: 'i is 0, then 1, then 2 inside the loop.',
    explanation: 'The loop runs for i values 0, 1, and 2.',
    difficulty: 'easy',
  },
  {
    id: 'oa-for-loop-count-014',
    mode: 'oa',
    title: 'for loop count',
    topic: 'for loops',
    skillTags: ['for loops', 'loops'],
    prompt: 'How many times does for (int i = 1; i <= 4; i++) run?',
    choices: [
      { id: 'a', text: '3' },
      { id: 'b', text: '4' },
      { id: 'c', text: '5' },
      { id: 'd', text: '1' },
    ],
    correctChoiceId: 'b',
    hint: 'It runs for 1, 2, 3, and 4.',
    explanation: 'The condition includes 4 because it uses <=.',
    difficulty: 'easy',
  },
  {
    id: 'oa-array-out-of-bounds-015',
    mode: 'oa',
    title: 'Array bounds',
    topic: 'arrays',
    skillTags: ['arrays', 'index', 'common compile errors'],
    prompt: 'For int[] nums = {1, 2, 3}; which index is invalid?',
    choices: [
      { id: 'a', text: '0' },
      { id: 'b', text: '1' },
      { id: 'c', text: '2' },
      { id: 'd', text: '3' },
    ],
    correctChoiceId: 'd',
    hint: 'The last valid index is length - 1.',
    explanation: 'A 3-item array has indexes 0, 1, and 2. Index 3 is out of bounds.',
    difficulty: 'easy',
    visualizerType: 'array',
    visualizerData: { values: [1, 2, 3], operation: 'Valid indexes are 0, 1, 2.' },
  },
  {
    id: 'oa-arraylist-get-016',
    mode: 'oa',
    title: 'ArrayList get',
    topic: 'ArrayLists',
    skillTags: ['ArrayLists', 'index'],
    prompt: 'Which line gets the first item from ArrayList<String> names?',
    choices: [
      { id: 'a', text: 'names.get(0)' },
      { id: 'b', text: 'names[0]' },
      { id: 'c', text: 'names.first' },
      { id: 'd', text: 'names.get[0]' },
    ],
    correctChoiceId: 'a',
    hint: 'ArrayList uses get(index).',
    explanation: 'Use names.get(0) for the first ArrayList item.',
    difficulty: 'easy',
    visualizerType: 'arraylist',
    visualizerData: { values: ['Ava', 'Ben'], operation: 'names.get(0) returns Ava.' },
  },
  {
    id: 'oa-method-call-017',
    mode: 'oa',
    title: 'Method call syntax',
    topic: 'methods',
    skillTags: ['methods', 'parameters'],
    prompt: 'Which line correctly calls setScore with the value 90?',
    choices: [
      { id: 'a', text: 'student.setScore(90);' },
      { id: 'b', text: 'student.setScore = 90;' },
      { id: 'c', text: 'setScore.student(90);' },
      { id: 'd', text: 'student setScore 90;' },
    ],
    correctChoiceId: 'a',
    hint: 'Use object dot method parentheses.',
    explanation: 'Object methods are called with objectName.methodName(arguments).',
    difficulty: 'beginner',
  },
  {
    id: 'oa-argument-018',
    mode: 'oa',
    title: 'Argument in method call',
    topic: 'argument',
    skillTags: ['methods', 'parameters'],
    prompt: 'In student.setScore(90), what is 90?',
    choices: [
      { id: 'a', text: 'An argument' },
      { id: 'b', text: 'A class' },
      { id: 'c', text: 'A constructor name' },
      { id: 'd', text: 'A field modifier' },
    ],
    correctChoiceId: 'a',
    hint: 'It is the actual value passed into the method.',
    explanation: 'A parameter is in the method header. An argument is passed in the call.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-return-statement-019',
    mode: 'oa',
    title: 'Return statement',
    topic: 'return types',
    skillTags: ['methods', 'return types'],
    prompt: 'A method header is public int getAge(). Which return statement fits?',
    choices: [
      { id: 'a', text: 'return age;' },
      { id: 'b', text: 'return "age";' },
      { id: 'c', text: 'return true;' },
      { id: 'd', text: 'return;' },
    ],
    correctChoiceId: 'a',
    hint: 'The method must return an int value.',
    explanation: 'If getAge returns int, returning an int field like age is correct.',
    difficulty: 'easy',
  },
  {
    id: 'oa-void-return-error-020',
    mode: 'oa',
    title: 'Void return error',
    topic: 'void',
    skillTags: ['void', 'return types', 'compile errors'],
    prompt: 'What is wrong with public void getAge() { return age; }?',
    choices: [
      { id: 'a', text: 'A void method should not return a value.' },
      { id: 'b', text: 'void methods must be private.' },
      { id: 'c', text: 'age must be a String.' },
      { id: 'd', text: 'The method needs no braces.' },
    ],
    correctChoiceId: 'a',
    hint: 'void means no value comes back.',
    explanation: 'A void method can use return; by itself, but it cannot return age.',
    difficulty: 'easy',
  },
  {
    id: 'oa-private-access-021',
    mode: 'oa',
    title: 'Private access',
    topic: 'public/private',
    skillTags: ['public/private', 'private fields', 'compile errors'],
    prompt: 'If score is private inside Student, outside code should usually read it using what?',
    choices: [
      { id: 'a', text: 'A public getter like getScore()' },
      { id: 'b', text: 'student.score directly' },
      { id: 'c', text: 'new private score' },
      { id: 'd', text: 'import score' },
    ],
    correctChoiceId: 'a',
    hint: 'Private fields are protected inside the class.',
    explanation: 'Outside code should use public methods to access private fields.',
    difficulty: 'easy',
  },
  {
    id: 'oa-object-field-022',
    mode: 'oa',
    title: 'Object has its own fields',
    topic: 'objects',
    skillTags: ['objects', 'classes', 'fields'],
    prompt: 'If two Student objects have different scores, where are those scores stored?',
    choices: [
      { id: 'a', text: 'Inside each object field' },
      { id: 'b', text: 'Only in the class name' },
      { id: 'c', text: 'Only in the import statement' },
      { id: 'd', text: 'Inside the for loop keyword' },
    ],
    correctChoiceId: 'a',
    hint: 'Each object has its own field values.',
    explanation: 'Objects made from the same class can store different field values.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-constructor-parameter-023',
    mode: 'oa',
    title: 'Constructor parameter',
    topic: 'constructors',
    skillTags: ['constructors', 'parameters', 'objects'],
    prompt: 'In new Student("Ava"), what is "Ava" used for?',
    choices: [
      { id: 'a', text: 'It is passed as an argument to the constructor.' },
      { id: 'b', text: 'It becomes the class name.' },
      { id: 'c', text: 'It imports Student.' },
      { id: 'd', text: 'It deletes the object.' },
    ],
    correctChoiceId: 'a',
    hint: 'Values inside parentheses are arguments.',
    explanation: 'The constructor can use "Ava" to initialize a field.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-getter-return-type-024',
    mode: 'oa',
    title: 'Getter return type',
    topic: 'getters',
    skillTags: ['getters', 'return types'],
    prompt: 'A field is private double price;. What should getPrice return?',
    choices: [
      { id: 'a', text: 'double' },
      { id: 'b', text: 'void' },
      { id: 'c', text: 'String' },
      { id: 'd', text: 'boolean' },
    ],
    correctChoiceId: 'a',
    hint: 'Getter type should match the field type.',
    explanation: 'price is a double, so getPrice should return double.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-setter-return-type-025',
    mode: 'oa',
    title: 'Setter return type',
    topic: 'setters',
    skillTags: ['setters', 'void'],
    prompt: 'A method setPrice changes a price field. What return type is most common?',
    choices: [
      { id: 'a', text: 'void' },
      { id: 'b', text: 'double' },
      { id: 'c', text: 'String' },
      { id: 'd', text: 'class' },
    ],
    correctChoiceId: 'a',
    hint: 'A setter changes data and usually sends nothing back.',
    explanation: 'Setters usually use void because they perform an update.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-missing-return-026',
    mode: 'oa',
    title: 'Missing return',
    topic: 'common compile errors',
    skillTags: ['compile errors', 'return types', 'methods'],
    prompt: 'What compile problem happens in public int getScore() { }?',
    choices: [
      { id: 'a', text: 'The method must return an int.' },
      { id: 'b', text: 'The method must be private.' },
      { id: 'c', text: 'The method must be named class.' },
      { id: 'd', text: 'The method cannot have braces.' },
    ],
    correctChoiceId: 'a',
    hint: 'Non-void methods must return a value.',
    explanation: 'Because the return type is int, the method needs a return statement with an int value.',
    difficulty: 'easy',
  },
  {
    id: 'oa-type-mismatch-027',
    mode: 'oa',
    title: 'Type mismatch',
    topic: 'common compile errors',
    skillTags: ['compile errors', 'data types'],
    prompt: 'Which line has a type mismatch?',
    choices: [
      { id: 'a', text: 'int age = "20";' },
      { id: 'b', text: 'String name = "Ava";' },
      { id: 'c', text: 'boolean done = false;' },
      { id: 'd', text: "char grade = 'A';" },
    ],
    correctChoiceId: 'a',
    hint: 'An int cannot store text in quotes.',
    explanation: '"20" is a String, not an int.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-arraylist-remove-028',
    mode: 'oa',
    title: 'ArrayList remove',
    topic: 'ArrayLists',
    skillTags: ['ArrayLists', 'methods'],
    prompt: 'Which line removes the item at index 0 from names?',
    choices: [
      { id: 'a', text: 'names.remove(0);' },
      { id: 'b', text: 'names.delete[0];' },
      { id: 'c', text: 'names[0].remove();' },
      { id: 'd', text: 'remove names 0;' },
    ],
    correctChoiceId: 'a',
    hint: 'ArrayList uses remove(index).',
    explanation: 'remove(0) removes the first item from an ArrayList.',
    difficulty: 'easy',
  },
  {
    id: 'oa-loop-sum-029',
    mode: 'oa',
    title: 'Loop sum purpose',
    topic: 'for loops',
    skillTags: ['for loops', 'arrays', 'sum array values'],
    prompt: 'In a loop, what does total += scores[i]; do?',
    choices: [
      { id: 'a', text: 'Adds the current score into total' },
      { id: 'b', text: 'Deletes the score' },
      { id: 'c', text: 'Creates a new class' },
      { id: 'd', text: 'Checks if total is private' },
    ],
    correctChoiceId: 'a',
    hint: '+= means add to the current value.',
    explanation: 'total += scores[i] is short for total = total + scores[i].',
    difficulty: 'easy',
  },
  {
    id: 'oa-main-method-030',
    mode: 'oa',
    title: 'Main method header',
    topic: 'methods',
    skillTags: ['methods', 'public/private', 'compile errors'],
    prompt: 'Which is the standard Java main method header?',
    choices: [
      { id: 'a', text: 'public static void main(String[] args)' },
      { id: 'b', text: 'public main void(String args)' },
      { id: 'c', text: 'private static int main()' },
      { id: 'd', text: 'main public static void args' },
    ],
    correctChoiceId: 'a',
    hint: 'Look for public static void main.',
    explanation: 'The standard entry point is public static void main(String[] args).',
    difficulty: 'easy',
  },
]

const phase22Questions: Question[] = [
  {
    id: 'pa-scope-local-031',
    mode: 'pa',
    title: 'Local variable scope',
    topic: 'variables',
    skillTags: ['variables', 'compile errors', 'methods'],
    prompt: 'A variable declared inside a method can usually be used where?',
    choices: [
      { id: 'a', text: 'Only inside that method block' },
      { id: 'b', text: 'In every class automatically' },
      { id: 'c', text: 'Only inside import statements' },
      { id: 'd', text: 'Only before it is declared' },
    ],
    correctChoiceId: 'a',
    hint: 'A local variable lives in its block.',
    explanation: 'Local variables are only available inside the block where they are declared.',
    difficulty: 'easy',
  },
  {
    id: 'pa-modulo-032',
    mode: 'pa',
    title: 'Remainder operator',
    topic: 'arithmetic',
    skillTags: ['arithmetic', 'integer division'],
    prompt: 'What is 10 % 3?',
    choices: [
      { id: 'a', text: '1' },
      { id: 'b', text: '3' },
      { id: 'c', text: '3.33' },
      { id: 'd', text: '0' },
    ],
    correctChoiceId: 'a',
    hint: '% gives the remainder.',
    explanation: '3 goes into 10 three times with 1 left over.',
    difficulty: 'easy',
  },
  {
    id: 'pa-double-cast-033',
    mode: 'pa',
    title: 'Force decimal average',
    topic: 'integer division',
    skillTags: ['integer division', 'data types', 'arithmetic'],
    prompt: 'Which expression avoids integer division when total and count are int?',
    choices: [
      { id: 'a', text: '(double) total / count' },
      { id: 'b', text: 'total / count' },
      { id: 'c', text: '(int) total / count' },
      { id: 'd', text: 'total // count' },
    ],
    correctChoiceId: 'a',
    hint: 'Make one side a double before division.',
    explanation: 'Casting total to double makes Java keep the decimal result.',
    difficulty: 'medium',
  },
  {
    id: 'pa-string-length-034',
    mode: 'pa',
    title: 'String length method',
    topic: 'strings',
    skillTags: ['strings', 'methods'],
    prompt: 'Which expression gets the number of characters in name?',
    choices: [
      { id: 'a', text: 'name.length()' },
      { id: 'b', text: 'name.length' },
      { id: 'c', text: 'name.size()' },
      { id: 'd', text: 'length.name()' },
    ],
    correctChoiceId: 'a',
    hint: 'String length is a method.',
    explanation: 'Strings use length() with parentheses.',
    difficulty: 'easy',
  },
  {
    id: 'pa-string-substring-035',
    mode: 'pa',
    title: 'Substring starts at index',
    topic: 'strings',
    skillTags: ['strings', 'indexing'],
    prompt: 'What does word.substring(0, 1) return for word = "Java"?',
    choices: [
      { id: 'a', text: '"J"' },
      { id: 'b', text: '"Ja"' },
      { id: 'c', text: '"a"' },
      { id: 'd', text: '"Java"' },
    ],
    correctChoiceId: 'a',
    hint: 'The end index is not included.',
    explanation: 'substring(0, 1) starts at 0 and stops before 1, so it returns the first character as a String.',
    difficulty: 'medium',
  },
  {
    id: 'pa-char-at-036',
    mode: 'pa',
    title: 'Get a character',
    topic: 'char',
    skillTags: ['char', 'strings', 'indexing'],
    prompt: 'Which expression gets the first character from name?',
    choices: [
      { id: 'a', text: 'name.charAt(0)' },
      { id: 'b', text: 'name[0]' },
      { id: 'c', text: 'name.char(1)' },
      { id: 'd', text: 'charAt.name(0)' },
    ],
    correctChoiceId: 'a',
    hint: 'String uses charAt(index).',
    explanation: 'charAt(0) returns the first character because indexes start at 0.',
    difficulty: 'easy',
  },
  {
    id: 'pa-and-operator-037',
    mode: 'pa',
    title: 'Boolean AND',
    topic: 'boolean',
    skillTags: ['boolean', 'if/else'],
    prompt: 'Which condition means score is at least 70 and attendance is true?',
    choices: [
      { id: 'a', text: 'score >= 70 && hasAttendance' },
      { id: 'b', text: 'score >= 70 || hasAttendance' },
      { id: 'c', text: 'score >= 70 & & hasAttendance' },
      { id: 'd', text: 'score = 70 && hasAttendance' },
    ],
    correctChoiceId: 'a',
    hint: 'AND is &&.',
    explanation: '&& requires both sides to be true.',
    difficulty: 'easy',
  },
  {
    id: 'pa-or-operator-038',
    mode: 'pa',
    title: 'Boolean OR',
    topic: 'boolean',
    skillTags: ['boolean', 'if/else'],
    prompt: 'Which operator means either condition can be true?',
    choices: [
      { id: 'a', text: '||' },
      { id: 'b', text: '&&' },
      { id: 'c', text: '==' },
      { id: 'd', text: '!=' },
    ],
    correctChoiceId: 'a',
    hint: 'OR uses two vertical bars.',
    explanation: '|| is true when at least one side is true.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-switch-default-039',
    mode: 'pa',
    title: 'Switch default',
    topic: 'switch',
    skillTags: ['switch', 'control flow'],
    prompt: 'What is default used for in a switch statement?',
    choices: [
      { id: 'a', text: 'Code to run when no case matches' },
      { id: 'b', text: 'A required constructor' },
      { id: 'c', text: 'A private field' },
      { id: 'd', text: 'A loop counter' },
    ],
    correctChoiceId: 'a',
    hint: 'Default is the fallback case.',
    explanation: 'default handles values that do not match any listed case.',
    difficulty: 'easy',
  },
  {
    id: 'pa-while-before-loop-040',
    mode: 'pa',
    title: 'While loop condition',
    topic: 'while loops',
    skillTags: ['while loops', 'loops'],
    prompt: 'When is a while loop condition checked?',
    choices: [
      { id: 'a', text: 'Before each loop run' },
      { id: 'b', text: 'Only after the loop ends' },
      { id: 'c', text: 'Only when the class is compiled' },
      { id: 'd', text: 'Never' },
    ],
    correctChoiceId: 'a',
    hint: 'while checks first.',
    explanation: 'A while loop checks the condition before running the body each time.',
    difficulty: 'easy',
  },
  {
    id: 'pa-enhanced-for-041',
    mode: 'pa',
    title: 'Enhanced for loop',
    topic: 'for loops',
    skillTags: ['for loops', 'arrays', 'loops'],
    prompt: 'Which loop visits each score value directly?',
    choices: [
      { id: 'a', text: 'for (int score : scores)' },
      { id: 'b', text: 'for (score in scores)' },
      { id: 'c', text: 'for (int score = scores)' },
      { id: 'd', text: 'for scores : int score' },
    ],
    correctChoiceId: 'a',
    hint: 'Enhanced for uses colon syntax.',
    explanation: 'for (int score : scores) reads one value at a time from scores.',
    difficulty: 'easy',
  },
  {
    id: 'pa-array-declare-042',
    mode: 'pa',
    title: 'Declare String array',
    topic: 'arrays',
    skillTags: ['arrays', 'data types'],
    prompt: 'Which line correctly creates a String array?',
    choices: [
      { id: 'a', text: 'String[] names = {"Ava", "Ben"};' },
      { id: 'b', text: 'String names = {"Ava", "Ben"};' },
      { id: 'c', text: 'Array String names = "Ava", "Ben";' },
      { id: 'd', text: 'names[] String = {"Ava", "Ben"};' },
    ],
    correctChoiceId: 'a',
    hint: 'Type[] name declares an array.',
    explanation: 'String[] means an array that stores String values.',
    difficulty: 'easy',
    visualizerType: 'array',
    visualizerData: { values: ['Ava', 'Ben'], operation: 'String[] names stores two String values.' },
  },
  {
    id: 'pa-arraylist-diamond-043',
    mode: 'pa',
    title: 'ArrayList diamond',
    topic: 'ArrayLists',
    skillTags: ['ArrayLists', 'compile errors'],
    prompt: 'Which line correctly creates an ArrayList<Integer>?',
    choices: [
      { id: 'a', text: 'ArrayList<Integer> scores = new ArrayList<>();' },
      { id: 'b', text: 'ArrayList<int> scores = new ArrayList<>();' },
      { id: 'c', text: 'int ArrayList scores = new ArrayList();' },
      { id: 'd', text: 'ArrayList<Integer> scores = new Integer<>();' },
    ],
    correctChoiceId: 'a',
    hint: 'ArrayList uses Integer, not int.',
    explanation: 'ArrayList stores objects, so use Integer for whole numbers.',
    difficulty: 'easy',
    visualizerType: 'arraylist',
    visualizerData: { values: [88, 91], operation: 'scores.add(100) grows the list.' },
  },
  {
    id: 'pa-static-method-044',
    mode: 'pa',
    title: 'Static helper method',
    topic: 'methods',
    skillTags: ['methods', 'return types'],
    prompt: 'Which header fits a helper method that returns the larger of two ints?',
    choices: [
      { id: 'a', text: 'public static int max(int a, int b)' },
      { id: 'b', text: 'public static void max(int a, int b)' },
      { id: 'c', text: 'public max int(a, b)' },
      { id: 'd', text: 'private class max(int a, int b)' },
    ],
    correctChoiceId: 'a',
    hint: 'It returns an int.',
    explanation: 'The return type must be int because the method gives back an integer.',
    difficulty: 'easy',
  },
  {
    id: 'pa-object-parameter-045',
    mode: 'pa',
    title: 'Object parameter',
    topic: 'object parameters',
    skillTags: ['objects', 'method-parameters', 'methods'],
    prompt: 'Which header accepts a Student object as a parameter?',
    choices: [
      { id: 'a', text: 'public void addStudent(Student student)' },
      { id: 'b', text: 'public void addStudent(String student)' },
      { id: 'c', text: 'public Student void addStudent(student)' },
      { id: 'd', text: 'public void Student(addStudent student)' },
    ],
    correctChoiceId: 'a',
    hint: 'Use the class name as the parameter type.',
    explanation: 'Student student means the method receives a Student object.',
    difficulty: 'easy',
  },
  {
    id: 'pa-private-constructor-field-046',
    mode: 'pa',
    title: 'Field assignment in constructor',
    topic: 'constructors',
    skillTags: ['constructors', 'private fields', 'classes'],
    prompt: 'Which line assigns a constructor parameter name to the field name?',
    choices: [
      { id: 'a', text: 'this.name = name;' },
      { id: 'b', text: 'name.this = name;' },
      { id: 'c', text: 'private name = this;' },
      { id: 'd', text: 'this = name.name;' },
    ],
    correctChoiceId: 'a',
    hint: 'this.name means the field.',
    explanation: 'this.name is the object field, and name is the parameter.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-getter-prefix-047',
    mode: 'pa',
    title: 'Getter naming',
    topic: 'getters',
    skillTags: ['getters', 'methods'],
    prompt: 'A field is named balance. Which is the most common getter name?',
    choices: [
      { id: 'a', text: 'getBalance' },
      { id: 'b', text: 'setBalance' },
      { id: 'c', text: 'voidBalance' },
      { id: 'd', text: 'newBalance' },
    ],
    correctChoiceId: 'a',
    hint: 'Getter names often start with get.',
    explanation: 'getBalance reads and returns the balance field.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-setter-prefix-048',
    mode: 'pa',
    title: 'Setter naming',
    topic: 'setters',
    skillTags: ['setters', 'methods', 'void'],
    prompt: 'A field is named balance. Which is the most common setter name?',
    choices: [
      { id: 'a', text: 'setBalance' },
      { id: 'b', text: 'getBalance' },
      { id: 'c', text: 'returnBalance' },
      { id: 'd', text: 'classBalance' },
    ],
    correctChoiceId: 'a',
    hint: 'Setter names often start with set.',
    explanation: 'setBalance changes the balance field.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-compile-case-sensitive-049',
    mode: 'pa',
    title: 'Case-sensitive names',
    topic: 'common compile errors',
    skillTags: ['compile errors', 'variables'],
    prompt: 'Why can score and Score cause confusion in Java?',
    choices: [
      { id: 'a', text: 'Java treats them as different names.' },
      { id: 'b', text: 'Java always treats them as the same name.' },
      { id: 'c', text: 'Java only allows uppercase variables.' },
      { id: 'd', text: 'Java changes both to private.' },
    ],
    correctChoiceId: 'a',
    hint: 'Java is case-sensitive.',
    explanation: 'score and Score are different identifiers in Java.',
    difficulty: 'beginner',
  },
  {
    id: 'pa-compile-parentheses-050',
    mode: 'pa',
    title: 'Method call parentheses',
    topic: 'common compile errors',
    skillTags: ['compile errors', 'methods'],
    prompt: 'Which method call has the correct parentheses?',
    choices: [
      { id: 'a', text: 'student.getName();' },
      { id: 'b', text: 'student.getName;' },
      { id: 'c', text: 'student.getName];' },
      { id: 'd', text: 'student getName();' },
    ],
    correctChoiceId: 'a',
    hint: 'Method calls use parentheses, even with no arguments.',
    explanation: 'getName() is a method call. The parentheses are required.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-variable-reassign-031',
    mode: 'oa',
    title: 'Variable reassignment',
    topic: 'variables',
    skillTags: ['variables', 'arithmetic'],
    prompt: 'What prints? int x = 2; x = x * 5; System.out.println(x);',
    choices: [
      { id: 'a', text: '2' },
      { id: 'b', text: '5' },
      { id: 'c', text: '10' },
      { id: 'd', text: '25' },
    ],
    correctChoiceId: 'c',
    hint: 'The second line updates x.',
    explanation: 'x becomes 2 * 5, which is 10.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-data-type-int-double-032',
    mode: 'oa',
    title: 'int versus double',
    topic: 'data types',
    skillTags: ['data types', 'integer division'],
    prompt: 'Which type should store 3.75?',
    choices: [
      { id: 'a', text: 'double' },
      { id: 'b', text: 'int' },
      { id: 'c', text: 'boolean' },
      { id: 'd', text: 'char' },
    ],
    correctChoiceId: 'a',
    hint: '3.75 has a decimal.',
    explanation: 'double stores decimal values.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-precedence-033',
    mode: 'oa',
    title: 'Operator precedence',
    topic: 'arithmetic',
    skillTags: ['arithmetic'],
    prompt: 'What is 2 + 8 / 4?',
    choices: [
      { id: 'a', text: '4' },
      { id: 'b', text: '2' },
      { id: 'c', text: '2.5' },
      { id: 'd', text: '10' },
    ],
    correctChoiceId: 'a',
    hint: 'Divide before adding.',
    explanation: '8 / 4 is 2, then 2 + 2 is 4.',
    difficulty: 'easy',
  },
  {
    id: 'oa-string-equals-034',
    mode: 'oa',
    title: 'String equals',
    topic: 'strings',
    skillTags: ['strings', 'compile errors'],
    prompt: 'Which expression compares two String values by text?',
    choices: [
      { id: 'a', text: 'first.equals(second)' },
      { id: 'b', text: 'first = second' },
      { id: 'c', text: 'first equals second' },
      { id: 'd', text: 'first.same(second)' },
    ],
    correctChoiceId: 'a',
    hint: 'Use .equals(...).',
    explanation: '.equals compares String text values.',
    difficulty: 'easy',
  },
  {
    id: 'oa-char-index-035',
    mode: 'oa',
    title: 'charAt index',
    topic: 'char',
    skillTags: ['char', 'strings', 'indexing'],
    prompt: 'What does "Code".charAt(1) return?',
    choices: [
      { id: 'a', text: "'C'" },
      { id: 'b', text: "'o'" },
      { id: 'c', text: "'d'" },
      { id: 'd', text: '"Co"' },
    ],
    correctChoiceId: 'b',
    hint: 'Index 0 is C.',
    explanation: 'Index 1 is the second character, o.',
    difficulty: 'easy',
  },
  {
    id: 'oa-not-operator-036',
    mode: 'oa',
    title: 'Boolean NOT',
    topic: 'boolean',
    skillTags: ['boolean'],
    prompt: 'If boolean isDone = false; what is !isDone?',
    choices: [
      { id: 'a', text: 'true' },
      { id: 'b', text: 'false' },
      { id: 'c', text: '0' },
      { id: 'd', text: 'It cannot compile.' },
    ],
    correctChoiceId: 'a',
    hint: '! flips a boolean.',
    explanation: '!false is true.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-if-assignment-error-037',
    mode: 'oa',
    title: 'Assignment in condition',
    topic: 'if/else',
    skillTags: ['if/else', 'compile errors', 'boolean'],
    prompt: 'Why is if (score = 70) wrong for comparing ints?',
    choices: [
      { id: 'a', text: '= assigns; == compares equality.' },
      { id: 'b', text: '= is only for Strings.' },
      { id: 'c', text: 'if statements cannot use numbers.' },
      { id: 'd', text: 'score must be private.' },
    ],
    correctChoiceId: 'a',
    hint: 'One equals assigns.',
    explanation: 'Use == to compare primitive values for equality.',
    difficulty: 'easy',
  },
  {
    id: 'oa-switch-type-038',
    mode: 'oa',
    title: 'Switch value',
    topic: 'switch',
    skillTags: ['switch', 'control flow'],
    prompt: 'A switch is usually useful when you compare one variable against what?',
    choices: [
      { id: 'a', text: 'Several specific values' },
      { id: 'b', text: 'Only private fields' },
      { id: 'c', text: 'Only ArrayList sizes' },
      { id: 'd', text: 'Only constructors' },
    ],
    correctChoiceId: 'a',
    hint: 'Think menu choices or letter grades.',
    explanation: 'switch works well for checking one value against multiple cases.',
    difficulty: 'easy',
  },
  {
    id: 'oa-while-zero-runs-039',
    mode: 'oa',
    title: 'While may run zero times',
    topic: 'while loops',
    skillTags: ['while loops', 'loops'],
    prompt: 'If int i = 5; while (i < 3) { i++; }, how many times does the loop run?',
    choices: [
      { id: 'a', text: '0' },
      { id: 'b', text: '1' },
      { id: 'c', text: '3' },
      { id: 'd', text: '5' },
    ],
    correctChoiceId: 'a',
    hint: 'Check the condition before running.',
    explanation: '5 < 3 is false, so the loop body never runs.',
    difficulty: 'easy',
  },
  {
    id: 'oa-for-off-by-one-040',
    mode: 'oa',
    title: 'Off-by-one loop',
    topic: 'for loops',
    skillTags: ['for loops', 'arrays', 'indexing'],
    prompt: 'Why is i <= nums.length risky when indexing nums[i]?',
    choices: [
      { id: 'a', text: 'It allows i to equal an invalid index.' },
      { id: 'b', text: 'It skips index 0.' },
      { id: 'c', text: 'It makes nums private.' },
      { id: 'd', text: 'It changes nums to an ArrayList.' },
    ],
    correctChoiceId: 'a',
    hint: 'Last valid index is length - 1.',
    explanation: 'i == nums.length is outside the array.',
    difficulty: 'medium',
  },
  {
    id: 'oa-array-default-int-041',
    mode: 'oa',
    title: 'New int array default',
    topic: 'arrays',
    skillTags: ['arrays', 'data types'],
    prompt: 'What default value is in a new int[3] before you assign values?',
    choices: [
      { id: 'a', text: '0' },
      { id: 'b', text: 'null' },
      { id: 'c', text: 'false' },
      { id: 'd', text: '""' },
    ],
    correctChoiceId: 'a',
    hint: 'int defaults to zero.',
    explanation: 'Numeric primitive arrays start with 0 values.',
    difficulty: 'easy',
    visualizerType: 'array',
    visualizerData: { values: [0, 0, 0], operation: 'new int[3] starts with three zeroes.' },
  },
  {
    id: 'oa-arraylist-set-042',
    mode: 'oa',
    title: 'ArrayList set',
    topic: 'ArrayLists',
    skillTags: ['ArrayLists', 'methods', 'indexing'],
    prompt: 'Which line replaces the first name with "Ava"?',
    choices: [
      { id: 'a', text: 'names.set(0, "Ava");' },
      { id: 'b', text: 'names[0] = "Ava";' },
      { id: 'c', text: 'names.replace = "Ava";' },
      { id: 'd', text: 'set.names(0, "Ava");' },
    ],
    correctChoiceId: 'a',
    hint: 'ArrayList uses set(index, value).',
    explanation: 'set(0, "Ava") replaces the value at index 0.',
    difficulty: 'easy',
    visualizerType: 'arraylist',
    visualizerData: { values: ['Ben', 'Cam'], operation: 'names.set(0, "Ava") replaces Ben.' },
  },
  {
    id: 'oa-method-overview-043',
    mode: 'oa',
    title: 'Method purpose',
    topic: 'methods',
    skillTags: ['methods'],
    prompt: 'What is a method mainly used for?',
    choices: [
      { id: 'a', text: 'A named block of code that performs a task' },
      { id: 'b', text: 'Only a place to import classes' },
      { id: 'c', text: 'Only a fixed-size list' },
      { id: 'd', text: 'Only a comment style' },
    ],
    correctChoiceId: 'a',
    hint: 'Methods organize behavior.',
    explanation: 'A method groups statements under a name so code can call it.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-parameter-order-044',
    mode: 'oa',
    title: 'Parameter order',
    topic: 'parameters',
    skillTags: ['method-parameters', 'methods'],
    prompt: 'For printName(String first, String last), what should the first argument be?',
    choices: [
      { id: 'a', text: 'The first name String' },
      { id: 'b', text: 'The last name String' },
      { id: 'c', text: 'A boolean' },
      { id: 'd', text: 'An ArrayList only' },
    ],
    correctChoiceId: 'a',
    hint: 'Arguments match parameters left to right.',
    explanation: 'The first argument fills the first parameter.',
    difficulty: 'easy',
  },
  {
    id: 'oa-class-field-method-045',
    mode: 'oa',
    title: 'Field or method',
    topic: 'classes',
    skillTags: ['classes', 'fields', 'methods'],
    prompt: 'In private int age;, what is age?',
    choices: [
      { id: 'a', text: 'A field' },
      { id: 'b', text: 'A method' },
      { id: 'c', text: 'A constructor' },
      { id: 'd', text: 'An argument' },
    ],
    correctChoiceId: 'a',
    hint: 'It stores data inside the object.',
    explanation: 'A field is a variable that belongs to an object.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-object-new-046',
    mode: 'oa',
    title: 'new keyword',
    topic: 'objects',
    skillTags: ['objects', 'constructors'],
    prompt: 'What does new usually do in Java?',
    choices: [
      { id: 'a', text: 'Creates an object' },
      { id: 'b', text: 'Deletes a class' },
      { id: 'c', text: 'Starts a loop' },
      { id: 'd', text: 'Makes a field private' },
    ],
    correctChoiceId: 'a',
    hint: 'new ClassName(...)',
    explanation: 'new creates an object and calls a constructor.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-constructor-return-047',
    mode: 'oa',
    title: 'Constructor return type',
    topic: 'constructors',
    skillTags: ['constructors', 'compile errors'],
    prompt: 'Which constructor header is valid for class Pet?',
    choices: [
      { id: 'a', text: 'public Pet(String name)' },
      { id: 'b', text: 'public void Pet(String name)' },
      { id: 'c', text: 'public String Pet(String name)' },
      { id: 'd', text: 'public constructor Pet(String name)' },
    ],
    correctChoiceId: 'a',
    hint: 'No return type.',
    explanation: 'Constructors use the class name and do not have a return type.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-getter-body-048',
    mode: 'oa',
    title: 'Getter body',
    topic: 'getters',
    skillTags: ['getters', 'return types'],
    prompt: 'Which body fits public String getName()?',
    choices: [
      { id: 'a', text: '{ return name; }' },
      { id: 'b', text: '{ this.name = name; }' },
      { id: 'c', text: '{ return 5; }' },
      { id: 'd', text: '{ void name; }' },
    ],
    correctChoiceId: 'a',
    hint: 'A getter returns the field.',
    explanation: 'getName returns a String field named name.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-setter-body-049',
    mode: 'oa',
    title: 'Setter body',
    topic: 'setters',
    skillTags: ['setters', 'void'],
    prompt: 'Which body fits public void setName(String name)?',
    choices: [
      { id: 'a', text: '{ this.name = name; }' },
      { id: 'b', text: '{ return name; }' },
      { id: 'c', text: '{ return 10; }' },
      { id: 'd', text: '{ String setName; }' },
    ],
    correctChoiceId: 'a',
    hint: 'A setter changes the field.',
    explanation: 'this.name = name copies the parameter into the object field.',
    difficulty: 'beginner',
  },
  {
    id: 'oa-compile-import-arraylist-050',
    mode: 'oa',
    title: 'Missing ArrayList import',
    topic: 'common compile errors',
    skillTags: ['compile errors', 'ArrayLists'],
    prompt: 'What is a common fix when Java cannot find symbol ArrayList?',
    choices: [
      { id: 'a', text: 'Add import java.util.ArrayList;' },
      { id: 'b', text: 'Rename ArrayList to array' },
      { id: 'c', text: 'Make every method private' },
      { id: 'd', text: 'Remove all semicolons' },
    ],
    correctChoiceId: 'a',
    hint: 'ArrayList is in java.util.',
    explanation: 'ArrayList usually needs import java.util.ArrayList; before the class.',
    difficulty: 'easy',
  },
  {
    id: 'lab-compile-fix-method-return-050',
    mode: 'end_lab',
    title: 'Fix missing return value',
    topic: 'common compile errors',
    skillTags: ['compile errors', 'methods', 'return types', 'void vs return'],
    prompt:
      'Complete getTotal so the non-void method returns the private total field.',
    starterCode: `public class Receipt {
    private double total;

    public double getTotal() {
        // TODO: return total
    }
}`,
    expectedPatterns: [
      'public\\s+double\\s+getTotal\\s*\\(\\s*\\)',
      'return\\s+total\\s*;',
    ],
    hint: 'A non-void method must return a value that matches its return type.',
    explanation:
      'Because getTotal has return type double, it must return a double value such as total.',
    difficulty: 'beginner',
    solution: `public double getTotal() {
    return total;
}`,
  },
]

const solutions: Record<string, string> = {
  'pa-class-student-001': `private String name;
private int score;

public Student(String name, int score) {
    this.name = name;
    this.score = score;
}

public String getName() {
    return name;
}

public int getScore() {
    return score;
}`,
  'pa-setter-product-002': `public void setPrice(double price) {
    this.price = price;
}`,
  'pa-array-total-003': `public static int totalScores(int[] scores) {
    int total = 0;
    for (int score : scores) {
        total += score;
    }
    return total;
}`,
  'pa-arraylist-names-004': `public static void addName(ArrayList<String> names, String name) {
    names.add(name);
}`,
  'pa-bankaccount-constructor-005': `private String owner;
private double balance;

public BankAccount(String owner, double balance) {
    this.owner = owner;
    this.balance = balance;
}

public double getBalance() {
    return balance;
}`,
  'lab-item-class-001': `private String name;
private int quantity;

public Item(String name, int quantity) {
    this.name = name;
    this.quantity = quantity;
}

public String getName() {
    return name;
}

public int getQuantity() {
    return quantity;
}`,
  'lab-average-array-002': `public static double averageScores(int[] scores) {
    int total = 0;
    for (int score : scores) {
        total += score;
    }
    return (double) total / scores.length;
}`,
  'lab-arraylist-count-003': `public static int countPassing(ArrayList<Integer> scores) {
    int count = 0;
    for (int score : scores) {
        if (score >= 70) {
            count++;
        }
    }
    return count;
}`,
  'lab-book-setter-004': `public void setTitle(String title) {
    this.title = title;
}`,
  'lab-method-return-005': `public static String getFullName(String firstName, String lastName) {
    return firstName + " " + lastName;
}`,
  'lab-private-fields-customer-006': `private String name;
private int rewardsPoints;`,
  'lab-constructor-grocery-007': `public GroceryItem(String name, double price) {
    this.name = name;
    this.price = price;
}`,
  'lab-getter-student-008': `public int getGrade() {
    return grade;
}`,
  'lab-setter-product-009': `public void setQuantity(int quantity) {
    this.quantity = quantity;
}`,
  'lab-create-array-scores-010': `int[] scores = {85, 92, 78};
return scores;`,
  'lab-loop-array-print-011': `for (int score : scores) {
    System.out.println(score);
}`,
  'lab-sum-array-prices-012': `double total = 0.0;
for (double price : prices) {
    total += price;
}
return total;`,
  'lab-smallest-array-013': `int smallest = values[0];
for (int value : values) {
    if (value < smallest) {
        smallest = value;
    }
}
return smallest;`,
  'lab-largest-array-014': `int largest = values[0];
for (int value : values) {
    if (value > largest) {
        largest = value;
    }
}
return largest;`,
  'lab-average-array-015': `int total = 0;
for (int score : scores) {
    total += score;
}
return (double) total / scores.length;`,
  'lab-arraylist-string-016': `ArrayList<String> names = new ArrayList<>();
return names;`,
  'lab-arraylist-integer-017': `ArrayList<Integer> scores = new ArrayList<>();
return scores;`,
  'lab-arraylist-custom-objects-018': `ArrayList<Product> products = new ArrayList<>();
return products;`,
  'lab-add-object-arraylist-019': `public void addProduct(Product product) {
    products.add(product);
}`,
  'lab-return-arraylist-getter-020': `public ArrayList<Book> getBooks() {
    return books;
}`,
  'lab-pass-object-method-021': `public static void printPetName(Pet pet) {
    System.out.println(pet.getName());
}`,
  'lab-void-method-dog-022': `public void celebrateBirthday() {
    age++;
}`,
  'lab-return-int-course-023': `public int getStudentCount() {
    return studentCount;
}`,
  'lab-return-double-product-024': `public double getTotalValue() {
    return price * quantity;
}`,
  'lab-return-string-book-025': `public String getLabel() {
    return title + " by " + author;
}`,
  'lab-customer-grocery-total-026': `public GroceryOrder(String customerName, double total) {
    this.customerName = customerName;
    this.total = total;
}

public double getTotal() {
    return total;
}`,
  'lab-student-course-list-027': `private ArrayList<Student> students = new ArrayList<>();

public void addStudent(Student student) {
    students.add(student);
}

public ArrayList<Student> getStudents() {
    return students;
}`,
  'lab-inventory-product-count-028': `public int getProductCount() {
    return products.size();
}`,
  'lab-dog-pet-constructor-029': `private String name;
private String type;

public Pet(String name, String type) {
    this.name = name;
    this.type = type;
}

public String getName() {
    return name;
}`,
  'lab-book-library-add-030': `public void addBook(Book book) {
    books.add(book);
}`,
  'lab-book-library-find-title-031': `public String findTitle(String targetTitle) {
    for (Book book : books) {
        if (book.getTitle().equals(targetTitle)) {
            return book.getTitle();
        }
    }
    return "Not found";
}`,
  'lab-course-average-grade-032': `public double averageGrade() {
    int total = 0;
    for (Student student : students) {
        total += student.getGrade();
    }
    return (double) total / students.size();
}`,
  'lab-grocery-cart-total-033': `public double cartTotal() {
    double total = 0.0;
    for (GroceryItem item : items) {
        total += item.getPrice();
    }
    return total;
}`,
  'lab-product-price-setter-034': `public void setPrice(double price) {
    this.price = price;
}`,
  'lab-pet-name-getter-setter-035': `public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}`,
}

export const questions: Question[] = [
  ...questionBank,
  ...supplementalPaoaQuestions,
  ...phase22Questions,
  ...finalLabPatterns,
].map((question) => ({
  ...question,
  solution: question.solution ?? solutions[question.id],
}))

export const questionCounts = questions.reduce(
  (counts, question) => {
    counts[question.mode] += 1
    return counts
  },
  {
    pa: 0,
    oa: 0,
    end_lab: 0,
  },
)
