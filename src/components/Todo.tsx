interface TodoProps {
  todo: {
    id: string;
    title: string;
    completed: boolean;
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function Todo({ todo, onToggle, onDelete }: TodoProps) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.title}</span>
      <button onClick={() => onDelete(todo.id)}>delete</button>
    </div>
  );
} 