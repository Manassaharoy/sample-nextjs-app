import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import Todo from '../Todo';

describe('Todo Component', () => {
  it('renders todo item correctly', () => {
    const todo = {
      id: '1',
      title: 'Learn Testing',
      completed: false,
    };

    render(<Todo todo={todo} onToggle={() => {}} onDelete={() => {}} />);
    const element = screen.getByText('Learn Testing');
    expect(element).toBeTruthy();
  });

  it('calls onToggle when checkbox is clicked', () => {
    const todo = {
      id: '1',
      title: 'Learn Testing',
      completed: false,
    };
    const onToggle = jest.fn();

    render(<Todo todo={todo} onToggle={onToggle} onDelete={() => {}} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(onToggle).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when delete button is clicked', () => {
    const todo = {
      id: '1',
      title: 'Learn Testing',
      completed: false,
    };
    const onDelete = jest.fn();

    render(<Todo todo={todo} onToggle={() => {}} onDelete={onDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    expect(onDelete).toHaveBeenCalledWith('1');
  });
}); 