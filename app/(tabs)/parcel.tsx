// app/(tabs)/parcel.tsx
import { StatsCard } from '@/components/cards/dashCard';
import { CompactParcelCard } from '@/components/cards/parcelCard';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function ParcelScreen() {
  // Données exemple
  const parcels = [
    {
      id: '1',
      parcelName: 'Parcelle d\'Ambodinonoka',
      coordinates: '-21.2234, 48.0156',
      farmerName: 'Mavirika',
      cropType: 'Riz',
      area: 2.5,
      yield: 3.8,
      taskDue: 'Dans 1 jour',
      irrigationStatus: 'good' as const,
      lastIrrigation: 'Hier',
      soilType: 'Argileux',
      imageUrl: 'https://images.unsplash.com/photo-1505253668822-42074d58a7c6',
    },
    {
      id: '2',
      parcelName: 'Parcelle Nord',
      coordinates: '-21.2250, 48.0200',
      farmerName: 'Rajao',
      cropType: 'Maïs',
      area: 3.2,
      yield: 5.1,
      taskDue: 'Dans 2 jours',
      irrigationStatus: 'average' as const,
    },
    {
      id: '3',
      parcelName: 'Parcelle Sud',
      farmerName: 'Soa',
      cropType: 'Haricot',
      area: 1.8,
      taskDue: 'Aujourd\'hui',
      irrigationStatus: 'poor' as const,
    },
  ];

  return (
    <SafeAreaView>
       <ScrollView className="bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-6">Vos parcelles</Text>
        <StatsCard 
          title="Parcelles surveillées" 
          value={parcels.length.toString()} 
          icon={<Ionicons name="leaf" size={24} color="#4CAF50" />} 
          backgroundColor="bg-green-100" 
          textColor="text-green-900" 
        />
        <StatsCard 
          title="Rendement Total (kg)" 
          value={parcels.length.toString()} 
          icon={<Ionicons name="earth" size={24} color="#46E3FFFF"/>} 
          backgroundColor="bg-blue-100"
        />

        <StatsCard 
          title="Tâches complétees" 
          value={23} 
          icon={<Ionicons name="leaf" size={24} color="#FFB546FF"/>} 
          backgroundColor="bg-red-100"
        />

        {/* Version compacte pour liste */}
        <View className="mt-6">
          <View className='flex flex-row justify-between items-center'>
            <Text className="text-lg font-semibold mb-4">Toutes les parcelles</Text>
            <TouchableOpacity className='p-2 bg-green-400 rounded-md'>
              <Text className= "color-white">+ Ajouter</Text>
            </TouchableOpacity>
          </View>
          {parcels.map((parcel) => (
            <CompactParcelCard
              key={parcel.id}
              parcelName={parcel.parcelName}
              farmerName={parcel.farmerName}
              cropType={parcel.cropType}
              area={parcel.area}
              taskDue={parcel.taskDue}
              irrigationStatus={parcel.irrigationStatus}
              onPress={() => console.log('Open parcel', parcel.id)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
   
  );
}

  {/* Avec FlatList pour performance */}
        {/* <View className="mt-8">
          <Text className="text-lg font-semibold mb-4">Parcelles à irriguer</Text>
          <FlatList
            data={parcels}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ParcelListCard
                id={item.id}
                name={item.parcelName}
                cropType={item.cropType}
                area={item.area}
                status="active"
                nextAction="Irrigation nécessaire"
                nextActionDate={item.taskDue}
                onPress={(id) => console.log('Press', id)}
              />
            )}
          />
        </View> */}

        {/* Grille de parcelles */}
       {/* <View className="mt-8">
          <Text className="text-lg font-semibold mb-4">Vue grille</Text>
          <View className="flex-row flex-wrap -mx-2">
            {parcels.map((parcel) => (
              <View key={parcel.id} className="w-1/2 px-2 mb-4">
                <View className="bg-white p-3 rounded-lg border border-gray-200">
                  <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center mb-2">
                    <Ionicons 
                      name={parcel.cropType === 'Riz' ? 'leaf' : 'ear'} 
                      size={24} 
                      color="#4CAF50" 
                    />
                  </View>
                  <Text className="font-bold text-gray-900" numberOfLines={1}>
                    {parcel.parcelName}
                  </Text>
                  <Text className="text-gray-600 text-sm mt-1">
                    {parcel.area} ha • {parcel.cropType}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View> */}

                {/* Carte détaillée (pour la vue principale) */}
        {/* <ParcelCard
          parcelName="Parcelle d'Ambodinonoka"
          coordinates="-21.2234, 48.0156"
          farmerName="Mavirika"
          cropType="Riz"
          area={2.5}
          yield={3.8}
          taskDue="Hjery"
          irrigationStatus="good"
          lastIrrigation="Hier"
          soilType="Argileux"
          onPress={() => console.log('Parcel pressed')}
          imageUrl="https://images.unsplash.com/photo-1505253668822-42074d58a7c6"
        /> */}