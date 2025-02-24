import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  family: z.literal('VALUE_FLEX'),
  type: z.union([z.literal('VARIABLE'), z.literal('FIXED')]),
  term: z.union([
    z.literal('1_YEAR'),
    z.literal('2_YEAR'),
    z.literal('3_YEAR'),
    z.literal('4_YEAR'),
    z.literal('5_YEAR'),
    z.literal('6_YEAR'),
    z.literal('7_YEAR'),
    z.literal('10_YEAR'),
  ]),
  insurable: z.boolean(),
  insurance: z.union([z.literal('INSURED'), z.literal('CONVENTIONAL')]),
  prepaymentOption: z.union([z.literal('STANDARD'), z.literal('HELOC')]),
  restrictionsOption: z.union([
    z.literal('NO_RESTRICTIONS'),
    z.literal('SOME_RESTRICTIONS'),
    z.literal('MORE_RESTRICTIONS'),
  ]),
  restrictions: z.string(),
  fixedPenaltySpread: z.string(),
  helocOption: z.union([z.literal('HELOC_WITH'), z.literal('HELOC_WITHOUT')]),
  helocDelta: z.number(),
  lenderName: z.string(),
  lenderType: z.string(),
  rateHold: z.union([
    z.literal('30_DAYS'),
    z.literal('45_DAYS'),
    z.literal('60_DAYS'),
    z.literal('90_DAYS'),
    z.literal('120_DAYS'),
  ]),
  rate: z.number(),
  ratePrimeVariance: z.number(),
  bestRate: z.number(),
  created: z.string(),
  updated: z.string(),
});

export const ApplicantSchema = z.object({
  phone: z.string().nullish(),
  email: z.string().nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
});

export const ApplicationSchema = z.object({
  id: z.string(),
  token: z.string().nullish(),
  type: z.union([
    z.literal('NEW'),
    z.literal('RENEWAL'),
    z.literal('REFINANCE'),
  ]),
  applicants: z.array(ApplicantSchema),
  productId: z.number().nullish(),
  createdAt: z.string(),
});

export const ApplicationsSchema = z.array(ApplicationSchema);
