// Quiz data
const quizData = {
  general: [
    {
      question: "What is the my Country?",
      options: ["London", "Berlin", "India", "Madrid"],
      answer: "India",
      explanation:
        "I have changed the question",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
      explanation: "Mars appears red due to iron oxide (rust) on its surface.",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: [
        "Vincent van Gogh",
        "Pablo Picasso",
        "Leonardo da Vinci",
        "Michelangelo",
      ],
      answer: "Leonardo da Vinci",
      explanation:
        "Leonardo da Vinci painted the Mona Lisa between 1503 and 1506.",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean",
      ],
      answer: "Pacific Ocean",
      explanation: "The Pacific Ocean covers about 30% of the Earth's surface.",
    },
    {
      question: "Which country is home to the kangaroo?",
      options: ["New Zealand", "South Africa", "Australia", "Brazil"],
      answer: "Australia",
      explanation: "Kangaroos are marsupials native to Australia.",
    },
    {
      question: "What is the currency of Japan?",
      options: ["Yuan", "Won", "Yen", "Ringgit"],
      answer: "Yen",
      explanation:
        "The yen has been the official currency of Japan since 1871.",
    },
    {
      question: "Which language has the most native speakers?",
      options: ["English", "Hindi", "Spanish", "Mandarin Chinese"],
      answer: "Mandarin Chinese",
      explanation: "Mandarin Chinese has about 1.1 billion native speakers.",
    },
    {
      question: "What is the tallest mountain in the world?",
      options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
      answer: "Mount Everest",
      explanation: "Mount Everest's peak is 8,848 meters above sea level.",
    },
    {
      question: "Which animal is known as the 'King of the Jungle'?",
      options: ["Tiger", "Elephant", "Lion", "Gorilla"],
      answer: "Lion",
      explanation:
        "Lions are often called the 'King of the Jungle' though they typically live in savannas.",
    },
    {
      question: "What is the largest country by area?",
      options: ["Canada", "China", "United States", "Russia"],
      answer: "Russia",
      explanation: "Russia covers about 17.1 million square kilometers.",
    },
  ],
  science: [
    {
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      answer: "Au",
      explanation: "Au comes from the Latin word 'aurum' meaning gold.",
    },
    {
      question: "Which gas is most abundant in Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      answer: "Nitrogen",
      explanation: "Nitrogen makes up about 78% of Earth's atmosphere.",
    },
    {
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Quartz"],
      answer: "Diamond",
      explanation: "Diamond scores 10 on the Mohs scale of mineral hardness.",
    },
    {
      question: "Which planet has the most moons?",
      options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      answer: "Saturn",
      explanation: "Saturn has 83 confirmed moons as of 2023.",
    },
    {
      question: "What is the pH value of pure water?",
      options: ["5", "7", "8", "10"],
      answer: "7",
      explanation: "Pure water is neutral with a pH of 7 at 25°C.",
    },
    {
      question: "Which scientist developed the theory of relativity?",
      options: [
        "Isaac Newton",
        "Albert Einstein",
        "Stephen Hawking",
        "Galileo Galilei",
      ],
      answer: "Albert Einstein",
      explanation:
        "Einstein published his special theory of relativity in 1905.",
    },
    {
      question: "What is the main component of the Sun?",
      options: ["Liquid lava", "Hot gas", "Molten iron", "Plasma"],
      answer: "Plasma",
      explanation:
        "The Sun is primarily composed of plasma, the fourth state of matter.",
    },
    {
      question: "Which blood type is known as the universal donor?",
      options: ["A", "B", "AB", "O"],
      answer: "O",
      explanation:
        "O negative blood can be donated to people with any blood type.",
    },
    {
      question: "What is the speed of light in a vacuum?",
      options: ["300,000 km/s", "150,000 km/s", "1 million km/s", "30 km/s"],
      answer: "300,000 km/s",
      explanation: "The exact speed is 299,792,458 meters per second.",
    },
    {
      question: "Which element has the atomic number 1?",
      options: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
      answer: "Hydrogen",
      explanation: "Hydrogen is the lightest and simplest element.",
    },
  ],
  history: [
    {
      question: "In which year did World War II end?",
      options: ["1943", "1945", "1947", "1950"],
      answer: "1945",
      explanation:
        "WWII ended on September 2, 1945, with Japan's formal surrender.",
    },
    {
      question: "Who was the first President of the United States?",
      options: [
        "Thomas Jefferson",
        "John Adams",
        "George Washington",
        "Abraham Lincoln",
      ],
      answer: "George Washington",
      explanation: "Washington served from 1789 to 1797.",
    },
    {
      question: "Which ancient civilization built the pyramids?",
      options: ["Greeks", "Romans", "Egyptians", "Mayans"],
      answer: "Egyptians",
      explanation: "The Great Pyramid of Giza was built around 2560 BCE.",
    },
    {
      question: "When was the Declaration of Independence signed?",
      options: ["1774", "1776", "1781", "1789"],
      answer: "1776",
      explanation: "It was signed on July 4, 1776.",
    },
    {
      question: "Who wrote 'The Communist Manifesto'?",
      options: [
        "Vladimir Lenin",
        "Joseph Stalin",
        "Karl Marx and Friedrich Engels",
        "Leon Trotsky",
      ],
      answer: "Karl Marx and Friedrich Engels",
      explanation: "It was published in 1848.",
    },
    {
      question: "Which empire was ruled by Julius Caesar?",
      options: ["Greek", "Roman", "Persian", "Ottoman"],
      answer: "Roman",
      explanation: "Julius Caesar was a Roman general and statesman.",
    },
    {
      question:
        "What was the name of the ship that brought the Pilgrims to America?",
      options: ["Santa Maria", "Mayflower", "Pinta", "Nina"],
      answer: "Mayflower",
      explanation: "It arrived in 1620.",
    },
    {
      question: "Who discovered America?",
      options: [
        "Christopher Columbus",
        "Vasco da Gama",
        "Ferdinand Magellan",
        "James Cook",
      ],
      answer: "Christopher Columbus",
      explanation: "Columbus reached the Americas in 1492.",
    },
  ],
  movies: [
    {
      question: "Who directed the movie 'Titanic'?",
      options: [
        "Steven Spielberg",
        "James Cameron",
        "Martin Scorsese",
        "Quentin Tarantino",
      ],
      answer: "James Cameron",
      explanation: "James Cameron also directed 'Avatar' and 'Terminator'.",
    },
    {
      question: "Which movie won the first Academy Award for Best Picture?",
      options: ["Gone with the Wind", "Wings", "Casablanca", "The Jazz Singer"],
      answer: "Wings",
      explanation: "Wings won at the 1st Academy Awards in 1929.",
    },
    {
      question: "Who played Jack Dawson in 'Titanic'?",
      options: ["Brad Pitt", "Tom Cruise", "Leonardo DiCaprio", "Johnny Depp"],
      answer: "Leonardo DiCaprio",
      explanation: "DiCaprio was nominated for an Oscar for this role.",
    },
    {
      question: "Which movie features the quote 'May the Force be with you'?",
      options: [
        "Star Trek",
        "Star Wars",
        "The Matrix",
        "Guardians of the Galaxy",
      ],
      answer: "Star Wars",
      explanation: "The phrase first appeared in the 1977 original Star Wars.",
    },
    {
      question: "What is the highest-grossing film of all time?",
      options: [
        "Avatar",
        "Avengers: Endgame",
        "Titanic",
        "Star Wars: The Force Awakens",
      ],
      answer: "Avatar",
      explanation: "Avatar has grossed over $2.8 billion worldwide.",
    },
    {
      question:
        "Which actor played Tony Stark in the Marvel Cinematic Universe?",
      options: [
        "Chris Evans",
        "Robert Downey Jr.",
        "Chris Hemsworth",
        "Mark Ruffalo",
      ],
      answer: "Robert Downey Jr.",
      explanation: "He played the role from 2008 to 2019.",
    },
    {
      question:
        "What is the name of the hobbit played by Elijah Wood in 'The Lord of the Rings'?",
      options: [
        "Samwise Gamgee",
        "Frodo Baggins",
        "Peregrin Took",
        "Meriadoc Brandybuck",
      ],
      answer: "Frodo Baggins",
      explanation: "Frodo is the main protagonist of the trilogy.",
    },
    {
      question: "Which movie features a character named Hannibal Lecter?",
      options: [
        "Se7en",
        "The Silence of the Lambs",
        "Psycho",
        "American Psycho",
      ],
      answer: "The Silence of the Lambs",
      explanation: "Anthony Hopkins won an Oscar for this role.",
    },
    {
      question:
        "What is the name of the fictional African country in 'Black Panther'?",
      options: ["Zamunda", "Wakanda", "Genosha", "Latveria"],
      answer: "Wakanda",
      explanation:
        "Wakanda is the most technologically advanced nation in the Marvel universe.",
    },
    {
      question: "Which movie musical features the song 'Let It Go'?",
      options: ["The Greatest Showman", "La La Land", "Frozen", "Moulin Rouge"],
      answer: "Frozen",
      explanation: "The song won the Academy Award for Best Original Song.",
    },
  ],
};
