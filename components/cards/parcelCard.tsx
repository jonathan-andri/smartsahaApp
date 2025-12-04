// components/cards/ParcelCard.tsx
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Clock, Droplets, MapPin } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export type ParcelCardProps = {
  // Informations principales
  parcelName: string;
  coordinates?: string; // Format: "-21.2234, 48.0156"
  farmerName?: string;
  cropType?: string;
  
  // Détails supplémentaires
  area?: number; // en hectares
  yield?: number; // en tonnes
  soilType?: string;
  irrigationStatus?: 'good' | 'average' | 'poor';
  lastIrrigation?: string; // Date
  nextTask?: string;
  taskDue?: string; // "Dans 3 jours", "Aujourd'hui", etc.
  
  // Visuel
  imageUrl?: string;
  cropIcon?: React.ReactNode;
  
  // Interaction
  onPress?: () => void;
  onLongPress?: () => void;
  showStatus?: boolean;
  isActive?: boolean;
  
  // Style
  variant?: 'default' | 'compact' | 'detailed';
  backgroundColor?: string;
  borderColor?: string;
};

export const ParcelCard = ({
  parcelName,
  coordinates,
  farmerName = 'Mavirika',
  cropType = 'Riz',
  area,
  yield: parcelYield,
  soilType,
  irrigationStatus = 'good',
  lastIrrigation,
  nextTask,
  taskDue = 'Voir',
  imageUrl,
  cropIcon,
  onPress,
  onLongPress,
  showStatus = true,
  isActive = true,
  variant = 'default',
  backgroundColor = 'bg-white',
  borderColor = 'border-gray-200',
}: ParcelCardProps) => {
  
  // Icône de culture par défaut
  const getCropIcon = () => {
    if (cropIcon) return cropIcon;
    
    const cropIcons: Record<string, React.ReactNode> = {
      'Riz': <Ionicons name="leaf" size={20} color="#4CAF50" />,
      'Maïs': <Ionicons name="ear" size={20} color="#FF9800" />,
      'Haricot': <FontAwesome name="pagelines" size={20} color="#795548" />,
      'Manioc': <MaterialIcons name="grass" size={20} color="#8BC34A" />,
      'Tomate': <Ionicons name="nutrition" size={20} color="#F44336" />,
      'Pomme de terre': <MaterialIcons name="agriculture" size={20} color="#9C27B0" />,
      'Légumes': <Ionicons name="fast-food" size={20} color="#4CAF50" />,
    };
    
    return cropIcons[cropType] || <Ionicons name="leaf" size={20} color="#4CAF50" />;
  };

  // Couleur d'état d'irrigation
  const getIrrigationColor = () => {
    switch (irrigationStatus) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'average': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Texte d'état d'irrigation
  const getIrrigationText = () => {
    switch (irrigationStatus) {
      case 'good': return 'Irrigation bonne';
      case 'average': return 'Irrigation moyenne';
      case 'poor': return 'Irrigation faible';
      default: return 'État inconnu';
    }
  };

  // Composant principal
  const CardContent = () => (
    <View
      className={`
        ${backgroundColor}
        ${borderColor}
        ${variant === 'compact' ? 'p-3 rounded-lg' : 'p-4 rounded-xl'}
        ${variant === 'detailed' ? 'rounded-2xl shadow-md' : 'border shadow-sm'}
        ${isActive ? '' : 'opacity-70'}
        ${variant !== 'compact' ? 'mb-3' : ''}
        my-1.5
      `}
    >
      {/* En-tête avec nom et coordonnées */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="font-bold text-lg text-gray-900">{parcelName}</Text>
          {coordinates && (
            <View className="flex-row items-center mt-1">
              <MapPin size={14} color="#6B7280" />
              <Text className="text-gray-600 text-sm ml-1">{coordinates}</Text>
            </View>
          )}
        </View>
        
        {showStatus && (
          <View className={`px-2 py-1 rounded-full ${getIrrigationColor()}`}>
            <Text className="text-xs font-medium">{getIrrigationText()}</Text>
          </View>
        )}
      </View>

      {/* Image ou placeholder */}
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-40 rounded-lg mb-3"
          resizeMode="cover"
        />
      ) : variant === 'detailed' && (
        <View className="w-full h-40 bg-gray-100 rounded-lg mb-3 items-center justify-center">
          <Ionicons name="map" size={48} color="#9CA3AF" />
          <Text className="text-gray-500 mt-2">Carte de la parcelle</Text>
        </View>
      )}

      {/* Informations détaillées */}
      <View className="space-y-3">
        {/* Ligne 1: Agriculteur + Culture */}
        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <Ionicons name="person" size={18} color="#6B7280" />
            <Text className="text-gray-700 ml-2">{farmerName}</Text>
          </View>
          
          <View className="flex-row items-center">
            {getCropIcon()}
            <Text className="text-gray-700 ml-2 font-medium">{cropType}</Text>
          </View>
        </View>

        {/* Ligne 2: Superficie + Rendement (si fournis) */}
        {(area || parcelYield) && (
          <View className="flex-row justify-between">
            {area && (
              <View className="flex-row items-center">
                <MaterialIcons name="square-foot" size={18} color="#6B7280" />
                <Text className="text-gray-700 ml-2">{area} ha</Text>
              </View>
            )}
            
            {parcelYield && (
              <View className="flex-row items-center">
                <MaterialIcons name="scale" size={18} color="#6B7280" />
                <Text className="text-gray-700 ml-2">{parcelYield} T</Text>
              </View>
            )}
          </View>
        )}

        {/* Ligne 3: Tâche suivante */}
        <View className="flex-row items-center justify-between pt-2 border-t border-gray-100">
          <View className="flex-row items-center">
            <Clock size={18} color="#6B7280" />
            <Text className="text-gray-700 ml-2">
              {nextTask || 'Tâche suivante'} • {taskDue}
            </Text>
          </View>
          
          {lastIrrigation && (
            <View className="flex-row items-center">
              <Droplets size={16} color="#3B82F6" />
              <Text className="text-blue-600 text-sm ml-1">{lastIrrigation}</Text>
            </View>
          )}
        </View>

        {/* Version détaillée - informations supplémentaires */}
        {variant === 'detailed' && (
          <>
            {soilType && (
              <View className="flex-row items-center mt-2">
                <MaterialIcons name="terrain" size={18} color="#6B7280" />
                <Text className="text-gray-700 ml-2">Sol: {soilType}</Text>
              </View>
            )}
            
            {/* Actions rapides */}
            <View className="flex-row justify-between mt-4 pt-3 border-t border-gray-100">
              <TouchableOpacity className="flex-row items-center">
                <Ionicons name="calendar" size={18} color="#3B82F6" />
                <Text className="text-blue-600 ml-1 text-sm">Planifier</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="flex-row items-center">
                <MaterialIcons name="edit" size={18} color="#10B981" />
                <Text className="text-green-600 ml-1 text-sm">Modifier</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="flex-row items-center">
                <Ionicons name="stats-chart" size={18} color="#8B5CF6" />
                <Text className="text-purple-600 ml-1 text-sm">Statistiques</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );

  // Gestion des interactions
  if (onPress || onLongPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={0.7}
        delayLongPress={500}
      >
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
};

// Version compacte pour les listes
export const CompactParcelCard = (props: Omit<ParcelCardProps, 'variant'>) => (
  <ParcelCard {...props} variant="compact" />
);

// Version détaillée pour les pages de détails
export const DetailedParcelCard = (props: Omit<ParcelCardProps, 'variant'>) => (
  <ParcelCard {...props} variant="detailed" />
);