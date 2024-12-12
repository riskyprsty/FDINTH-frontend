import React, { useState } from 'react';


export interface User {
  user_id: string; 
  username: string;
  img?: string;
  token: string;
  cookies: string;
  user_agent: string;
  profile_pict?: string;
}

export interface TaskType {
  value: 'FETCH' | 'COMMENT' | 'LIKE';
  label: string;
  color: string;
}

interface AssignTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedTaskTypes: string[]) => void;
  selectedUsers: User[];
  taskTypes: TaskType[];
}

const AssignTaskModal: React.FC<AssignTaskModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  selectedUsers,
  taskTypes 
}) => {
  const [selectedTaskTypes, setSelectedTaskTypes] = useState<string[]>([]);

  const handleTaskTypeToggle = (taskType: string) => {
    setSelectedTaskTypes(prev => 
      prev.includes(taskType)
        ? prev.filter(t => t !== taskType)
        : [...prev, taskType]
    );
  };

  const handleSubmit = () => {
    if (selectedTaskTypes.length === 0) {
      alert('Pilih setidaknya satu task type');
      return;
    }

    onSubmit(selectedTaskTypes);
    setSelectedTaskTypes([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Assign Tasks to {selectedUsers.length} Users
        </h2>
        
        <div className="space-y-3 mb-4">
          {taskTypes.map((task) => (
            <label 
              key={task.value} 
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedTaskTypes.includes(task.value)}
                onChange={() => handleTaskTypeToggle(task.value)}
                className={`checkbox checkbox-${task.color}`}
              />
              <span>{task.label}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <button 
            onClick={onClose} 
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="btn btn-primary"
            disabled={selectedTaskTypes.length === 0}
          >
            Assign Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTaskModal;