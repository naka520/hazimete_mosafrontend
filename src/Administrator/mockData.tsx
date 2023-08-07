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
      sender: "User1",
      content: "Hello User2!",
      timestamp: "2023-08-06T12:00:00",
    },
    {
      id: 2,
      sender: "User2",
      content: "Hi User1!",
      timestamp: "2023-08-06T12:05:00",
    },
    // Add more mock DMs here if needed
  ];
  
  export default mockData;
  