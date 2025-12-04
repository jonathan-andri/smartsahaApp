import { Calendar, CheckCircle, Circle, Flag } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// Define types
export type Priority = 'bas' | 'moyen' | 'haute';
export type Status = 'à faire' | 'en cours' | 'fait';

export interface TaskProps {
  taskName: string;
  due: Date | string;
  parceCrop: string;
  priority: Priority;
  status: Status;
  onPress?: () => void;
  onStatusChange?: (newStatus: Status) => void;
}

const TaskCard: React.FC<TaskProps> = ({
  taskName,
  due,
  parceCrop,
  priority,
  status,
  onPress,
  onStatusChange,
}) => {
  // Format date
  const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (dateObj.toDateString() === today.toDateString()) return 'Today';
    if (dateObj.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return dateObj.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Priority colors
  const priorityColors = {
    bas: 'bg-emerald-500',
    moyen: 'bg-amber-500',
    haute: 'bg-rose-500'
  };

  // Status colors
  const statusColors = {
    'à faire': 'text-gray-500',
    'en cours': 'text-blue-500',
    'fait': 'text-emerald-500'
  };

  // Status icons
  const StatusIcon = () => {
    switch (status) {
      case 'fait':
        return <CheckCircle size={20} className="text-emerald-500" />;
      case 'en cours':
        return <Circle size={20} className="text-blue-500" fill="#3B82F6" />;
      default:
        return <Circle size={20} className="text-gray-300" />;
    }
  };

  // Priority icon color
  const getPriorityColor = () => {
    switch (priority) {
      case 'bas': return '#10B981';
      case 'moyen': return '#F59E0B';
      case 'haute': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const handleStatusPress = () => {
    if (!onStatusChange) return;
    
    const statusOrder: Status[] = ['à faire', 'en cours', 'fait'];
    const currentIndex = statusOrder.indexOf(status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    onStatusChange(statusOrder[nextIndex]);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white dark:bg-gray-900 p-4 mb-3 rounded-xl border border-gray-200 dark:border-gray-800"
      activeOpacity={0.7}
    >
      <View className="flex-row items-start">
        {/* Status indicator */}
        <TouchableOpacity 
          onPress={handleStatusPress}
          className="mr-3 pt-0.5"
          disabled={!onStatusChange}
        >
          <StatusIcon />
        </TouchableOpacity>

        {/* Main content */}
        <View className="flex-1">
          {/* Task name and priority */}
          <View className="flex-row justify-between items-start mb-2">
            <Text 
              className={`flex-1 text-base font-moyen dark:text-white ${status === 'fait' ? 'line-through text-gray-400' : ''}`}
              numberOfLines={2}
            >
              {taskName}
            </Text>
            
            <View className="flex-row items-center ml-2">
              <Flag size={14} color={getPriorityColor()} />
              <Text className="ml-1 text-xs font-moyen text-gray-500 dark:text-gray-400 uppercase">
                {priority}
              </Text>
            </View>
          </View>

          {/* Details row */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-4">
              {/* Parce crop */}
              <View className="flex-row items-center">
                <View className={`w-2 h-2 rounded-full ${priorityColors[priority]}`} />
                <Text className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  {parceCrop}
                </Text>
              </View>

              {/* Due date */}
              <View className="flex-row items-center">
                <Calendar size={14} className="text-gray-400" />
                <Text className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  {formatDate(due)}
                </Text>
              </View>
            </View>

            {/* Status badge */}
            <View className={`px-3 py-1 rounded-full ${status === 'fait' ? 'bg-emerald-50 dark:bg-emerald-900/20' : status === 'en cours' ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}>
              <Text className={`text-xs font-moyen capitalize ${statusColors[status]}`}>
                {status.replace('-', ' ')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;