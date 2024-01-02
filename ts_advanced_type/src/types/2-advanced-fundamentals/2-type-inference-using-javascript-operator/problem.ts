interface Teacher {
  id: string;
  course: string;
}

interface Student {
  name: string;
}

/*
  YOUR JOB:
  1. Write the condition for checking the existance of course property in user object.
  2. Your code should help Typescript infer the type of the user object, wether Teacher or Student.
*/

const renderPage = (user: Teacher | Student) => {
  if(/* course exists in user */){
    render(user.course);
  }else{
    render(user.name);
  }
}

export const render = (title: string ) => {
  //Render page with proper info.
}