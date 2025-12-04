
import { Button } from '@react-navigation/elements';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import * as Progress from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskCard, { Status, TaskProps } from '../../components/cards/taskCard';

export default function Task() {
  const [selectedDate, setSelectedDate] = useState('');
  const completedTasks = 45;
  const totalTasks = 100; // Assume a total number for demonstration
  const progress = totalTasks > 0 ? completedTasks / totalTasks : 0;

  const handleStatusChange = (index: number, newStatus: Status) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = newStatus;
    setTasks(updatedTasks);
  };


  const [tasks, setTasks] = useState<TaskProps[]>([
    {
      taskName: 'Arroser les plantes',
      due: new Date(2024, 0, 15),
      parceCrop: 'Riz',
      priority: 'haute',
      status: 'à faire'
    },
    {
      taskName: 'Appliquer un fertilisateur',
      due: new Date(2024, 0, 10),
      parceCrop: 'Mais',
      priority: 'moyen',
      status: 'en cours'
    },
    {
      taskName: 'Collecter les récoltes',
      due: new Date(2024, 0, 5),
      parceCrop: 'Tomate',
      priority: 'bas',
      status: 'fait'
    }
  ]);

  return (
    <SafeAreaView>
      <ScrollView>
    <View className='p-5'>
      <Text className='text-2xl font-bold mb-3'>Tasks</Text>
      <Calendar 
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: {selected: true, selectedColor: '#25FF79FF'}
        }}
      />
      <View>
        <View className='bg-white p-5 flex justify-between items-center my-5 h-56'>
          <Text className='text-2xl'>Total des tâches</Text>
          <Text className='text-6xl font-bold'>0</Text>
          <View className='w-full h-1 bg-gray-200'></View>
          <Text className='text-xl'>Tâches completées: <Text>0</Text>%</Text>
        </View>
        <View className='bg-white p-5 flex justify-between mb-5 h-56'>
          <Text className='text-2xl text-gray-600'>Tâches par priorité</Text>
          <View className='flex flex-row justify-between'>
            <Text className='text-2xl font-semibold'>Haute</Text>
            <Text className='text-2xl font-semibold'>0</Text>
          </View>
          <View className='flex flex-row justify-between'>
            <Text className='text-2xl font-semibold'>Moyenne</Text>
            <Text className='text-2xl font-semibold'>0</Text>
          </View>
          <View className='flex flex-row justify-between'>
            <Text className='text-2xl font-semibold'>Basse</Text>
            <Text className='text-2xl font-semibold'>0</Text>
          </View>
        </View>
        <View className='bg-white p-5 flex justify-between my-5'>
          <Text className='text-xl mb-3'>Progression de la tâche</Text>
          <Progress.Bar 
                progress={progress} 
                width={null} // null makes it automatically fill the container width
                color={'#25FF79FF'} 
                unfilledColor={'#e0e0de'}
                borderWidth={0} // Remove border for a cleaner look
                height={30}
          />
        </View>
        <Button className='mb-3 bg-green-200' >+ Nouvelle Tâche</Button>
        <ScrollView showsVerticalScrollIndicator={false}>
          {tasks.map((task, index) => (
            <TaskCard
              key={index}
              {...task}
              onStatusChange={(newStatus) => handleStatusChange(index, newStatus)}
              onPress={() => console.log('Task pressed:', task.taskName)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView> 
  )
}
