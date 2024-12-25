const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_AI_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

  export  const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "create kids story on description for 5-8 years kids, Educational story, and all images in Paper cut style: story of boys and Magic school, give me 5 chapter,  with detailed image text prompt for each of chapter and image prompt story cover book with story name, all in JSON field format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"title\": \"The Whispering Willow Academy\",\n  \"cover\": {\n    \"image_prompt\": \"A paper-cut style illustration of a whimsical, slightly crooked schoolhouse nestled amongst rolling green hills. The schoolhouse has a bright red roof, cheerful yellow windows, and a tall, slender willow tree with sparkling leaves leaning protectively over it. A group of diverse children with different hair and skin tones, are gathered at the entrance, looking excited and slightly nervous, each holding a small, uniquely shaped wooden satchel. The sky above is a soft blue with paper-cut style clouds and a single, slightly oversized sun. The title 'The Whispering Willow Academy' is written in a playful, slightly uneven font above the schoolhouse. The style is vibrant and childlike with clearly defined paper layers.\",\n    \"story_prompt\": \"This is the cover for our story, 'The Whispering Willow Academy'. It shows the school and the children eager to learn.\"\n  },\n  \"chapters\": [\n    {\n      \"chapter_number\": 1,\n      \"title\": \"The Curious Letter\",\n        \"image_prompt\": \"A paper-cut style illustration showing a messy but cozy boy's bedroom. A young boy named Leo, with bright red hair and freckles, is sitting on his bed looking at a parchment-like letter with a wax seal shaped like a leaf. He is wearing striped pajamas and the room has scattered toys, books, and a small globe. The letter is glowing slightly with a soft yellow light. Paper-cut style shadows from the lamp make the room feel warm and inviting. The background includes cut-out shapes of shelves filled with toys, books, and a colorful kite hanging from the ceiling.\",\n      \"story_text\": \"Leo loved adventures, but most of them happened in his imagination. One sunny morning, a letter arrived, not a regular letter, but one tied with a shimmering leaf ribbon! The letter glowed gently as Leo carefully unrolled it, revealing words that spoke of a special place: 'The Whispering Willow Academy'. It invited him to discover the magic within himself. Leo was very excited and could not wait to see where he is going.\"\n    },\n    {\n      \"chapter_number\": 2,\n      \"title\": \"The Magical Map\",\n        \"image_prompt\": \"A paper-cut style illustration of Leo, now wearing a slightly oversized backpack, standing at the edge of a magical forest. The forest trees are made of overlapping layers of green paper, some with whimsical shapes and glowing leaves. A winding path of yellow paper leads deeper into the woods. In his hand, Leo is holding a map made of layered parchment paper with symbols of leaves, stars, and tiny mountains. A friendly looking owl with large, paper-cut eyes is perched on a nearby tree branch, seemingly guiding him. The overall scene is vibrant and playful with cut-out style flowers and butterflies scattered around.\",\n      \"story_text\": \"The letter also included a magical map. The path twisted and turned through a forest, where the leaves whispered secrets. It shimmered with tiny glowing symbols that only Leo could understand. Following the map, he bravely stepped into the woods. He felt little scared to be alone but was so excited and he followed the path and he saw an Owl waving at him to come.\"\n    },\n    {\n      \"chapter_number\": 3,\n      \"title\": \"The Whispering Willow\",\n        \"image_prompt\": \"A paper-cut style illustration showing the front of the 'Whispering Willow Academy'. The schoolhouse from the cover is now shown in more detail with paper-cut style vines crawling up its walls and small, glowing windows. In front of the building stands a large, majestic willow tree with sparkling leaves and a friendly face etched into the bark. A group of children, different from the group on the cover, are playing and learning in a garden, using paper-cut style magnifying glasses to examine leaves, while others are sketching in notepads. Leo is just arriving, looking up at the school with awe and happiness. The sky is a soft blue with paper-cut style birds flying above.\",\n      \"story_text\": \"Finally, he saw it - The Whispering Willow Academy! The school was just as the letter described and it was huge! The huge willow tree greeted him with a rustling of leaves that sounded like giggling. Other children were already there, laughing, learning, and exploring a magical garden around the school. This place was even more magical than Leo had imagined!\"\n    },\n      {\n        \"chapter_number\": 4,\n        \"title\": \"A Day of Discovery\",\n        \"image_prompt\": \"A paper-cut style illustration showing a classroom inside The Whispering Willow Academy. The classroom is filled with paper-cut style desks and chairs of various colors. The room is decorated with whimsical drawings and paper cut-out projects. Leo and other diverse children are working on different activities: one is making a paper bird fly using a string, others are mixing colorful potions, and some are reading old books with golden letters. A wise looking teacher with paper-cut glasses and hair, is gently guiding the children and smiling. The classroom is filled with warm, colorful paper-cut details making it feel cozy and magical.\",\n        \"story_text\": \"At the Whispering Willow Academy, every day was an adventure. Leo learned to make paper birds fly with a gentle tug of a string, mixed potions that smelled like sunshine, and read books with golden letters. The teacher showed them that each of them have a magic within them and that they are all special and unique. He was never bored and always excited for what new things he will learn.\"\n      },\n        {\n      \"chapter_number\": 5,\n      \"title\": \"Magic Inside\",\n         \"image_prompt\": \"A paper-cut style illustration showing the children from the academy in the school garden near the whispering willow.  Leo with his friends, each with their unique skills, are creating beautiful things. One is making a paper bird fly, another is painting the world with vibrant colors, and another is growing paper-cut style flowers with a touch. The friendly willow tree is glowing slightly, as if sharing it's magic with them. They are laughing, helping, and working together. The sky is full of swirling paper-cut style stars and a crescent moon. The image is filled with vibrant colors and a feeling of wonder and friendship.\",\n      \"story_text\": \"Leo discovered that his magic was making things glow! He made stars dance in the sky and flowers sparkle with light. All the children found their own special magic, learning to use it to make the world a more wonderful place. The Whispering Willow Academy was more than just a school; it was a place where everyone discovered the magic inside themselves and learnt that we are all unique and all have something to share with the world.\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  