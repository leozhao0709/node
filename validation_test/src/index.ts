import * as yup from 'yup';

type Person = {
  firstName: string;
};

const schema: yup.SchemaOf<Person> = yup.object().shape({
  firstName: yup.string().required('this is required').min(5, 'at least 5').max(10, 'max with 10'),
});

schema
  .validate({
    firstName: 'asda',
  })
  .then((result) => console.log(result))
  .catch((err) => console.log(err.errors));

try {
  schema.validateSync({ firstName: 'asdd' });
} catch (error) {
  console.log(error.errors);
}
