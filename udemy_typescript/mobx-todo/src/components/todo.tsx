import * as React from 'react';

interface TodoProps extends React.HtmlHTMLAttributes<{}> {
    todoId: number;
    content: string;
    finished: boolean;
}

export const Todo: React.SFC<TodoProps> = (props: TodoProps) => {
    return (
        <div>
            <p>
                {props.todoId}: {props.content}  <strong>{props.finished ? "finished" : "unfinished"} </strong>
            </p>
        </div>
    );
};

Todo.defaultProps = {
};
