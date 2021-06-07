import { z } from 'zod';

const schema = z.object({
  firstName: z.string().min(5, 'at least 5').max(10, 'max width 10').optional(),
});

type Person = z.infer<typeof schema>;

const p1: Person = { firstName: '123' };

const p2 = schema.safeParse({ firstName: 'asdas' });

if (!p2.success) {
  // console.log(p2.error.issues); // { "code": "too_small", "minimum": 5, "type": "string", "inclusive": true, "message": "at least 5", "path": ["firstName"]}
  // console.log(p2.error.issues[0].message); // at least 5

  console.log(p2.error.format()); // { _errors: [], firstName: { _errors: [ 'should be an email', 'at least 5' ] }}
} else {
  const data = p2.data;
  console.log(data);
}
