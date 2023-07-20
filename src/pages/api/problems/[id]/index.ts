import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { problemValidationSchema } from 'validationSchema/problems';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.problem
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getProblemById();
    case 'PUT':
      return updateProblemById();
    case 'DELETE':
      return deleteProblemById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getProblemById() {
    const data = await prisma.problem.findFirst(convertQueryToPrismaUtil(req.query, 'problem'));
    return res.status(200).json(data);
  }

  async function updateProblemById() {
    await problemValidationSchema.validate(req.body);
    const data = await prisma.problem.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteProblemById() {
    const data = await prisma.problem.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
