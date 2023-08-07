// mockData.ts

export interface Dm {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
  }
  
  const mockData: Dm[] = [
    {
      id: 1,
      sender: "田中",
      content: "選手交代についてのお願いです",
      timestamp: "2023-08-06T12:00:00",
    },
    {
      id: 2,
      sender: "岩本",
      content: "選手点呼の場所は正門で良かったですか？",
      timestamp: "2023-08-06T12:05:00",
    },
    {
      id: 3,
      sender: "本山",
      content: "審判交代のお願いです",
      timestamp: "2023-08-06T12:05:00",
    },
    // Add more mock DMs here if needed
  ];
  
  export default mockData;
  