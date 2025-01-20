export const db = {
  titles: [
    {
      id: "1",
      label: "Mr.",
    },
    {
      id: "2",
      label: "Ms.",
    },
    {
      id: "3",
      label: "Dr.",
    },
  ],
  skills: [
    {
      id: "1",
      label: "html",
    },
    {
      id: "2",
      label: "css",
    },
    {
      id: "3",
      label: "javascript",
    },
    {
      id: "4",
      label: "typescript",
    },
  ],
  users: [
    {
      title: "1",
      name: "David",
      email: "david@gmail.com",
      skills: ["1", "2", "3"],
      workExperience: false,
      id: "1",
    },
    {
      title: "3",
      name: "Robert",
      email: "robert@hotmail.com",
      skills: ["2", "1"],
      workExperience: true,
      companyAndTimeRange: [
        {
          company: "ABC co.",
          timeRange: ["2023-12-31T23:00:00.000Z", "2025-01-11T23:00:00.000Z"],
        },
      ],
      id: "2",
    },
    {
      title: "2",
      name: "Lily",
      email: "lily@xmail.com",
      skills: ["2", "1"],
      workExperience: true,
      companyAndTimeRange: [
        {
          company: "Fif GmbH",
          timeRange: ["2020-02-29T23:00:00.000Z", "2025-01-11T23:00:00.000Z"],
        },
      ],
      id: "3",
    },
  ],
};
