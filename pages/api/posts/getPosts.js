import prisma from "../../../prisma/client"

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
          hearts: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      return res.status(200).json(data)
    } catch (err) {
      console.error("Error fetching posts:", err)
      return res.status(500).json({ error: "Error occurred while fetching posts" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

