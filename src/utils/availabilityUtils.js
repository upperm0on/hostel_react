// Availability utility functions for hostel and room management

/**
 * Determines the availability status of a hostel
 * @param {Object} hostel - The hostel object
 * @returns {Object} - Availability status with type and message
 */
export const getHostelAvailabilityStatus = (hostel) => {
  // Check if hostel itself is marked as unavailable
  if (hostel.is_available === false || hostel.status !== 'Available') {
    return {
      type: 'under_service',
      message: 'Service',
      isAvailable: false,
      icon: 'wrench'
    };
  }

  // Parse room details
  const room_details = normalizeRooms(hostel.room_details);
  
  if (room_details.length === 0) {
    return {
      type: 'no_rooms',
      message: 'No Rooms Available',
      isAvailable: false,
      icon: 'alert'
    };
  }

  // Check if all rooms are unavailable
  const allRoomsUnavailable = room_details.every(room => 
    room.room_available === false || room.room_available === 0
  );

  if (allRoomsUnavailable) {
    return {
      type: 'not_available',
      message: 'Not Available',
      isAvailable: false,
      icon: 'ban'
    };
  }

  // Check if some rooms are available
  const availableRooms = room_details.filter(room => 
    room.room_available === true || room.room_available === 1
  );

  if (availableRooms.length > 0) {
    return {
      type: 'available',
      message: `${availableRooms.length} Room${availableRooms.length > 1 ? 's' : ''} Available`,
      isAvailable: true,
      icon: 'check'
    };
  }

  // Default case
  return {
    type: 'unknown',
    message: 'Status Unknown',
    isAvailable: false,
    icon: 'question'
  };
};

/**
 * Determines the availability status of a specific room
 * @param {Object} room - The room object
 * @param {Object} hostel - The parent hostel object
 * @returns {Object} - Room availability status
 */
export const getRoomAvailabilityStatus = (room, hostel) => {
  // If hostel is under service, room is not available
  if (hostel.is_available === false || hostel.status !== 'Available') {
    return {
      type: 'under_service',
      message: 'Service',
      isAvailable: false,
      icon: 'wrench'
    };
  }

  // Check room-specific availability
  const isRoomAvailable = Boolean(room.room_available);
  
  if (isRoomAvailable) {
    return {
      type: 'available',
      message: 'Available',
      isAvailable: true,
      icon: 'check'
    };
  } else {
    return {
      type: 'not_available',
      message: 'Not Available',
      isAvailable: false,
      icon: 'ban'
    };
  }
};

/**
 * Normalizes room details array
 * @param {*} value - Room details value
 * @returns {Array} - Normalized room details array
 */
const normalizeRooms = (value) => {
  try {
    if (Array.isArray(value)) return value;
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
        const parsed = JSON.parse(trimmed);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    }
    if (typeof value === "object" && value !== null) {
      return Array.isArray(value) ? value : [];
    }
    return [];
  } catch (e) {
    console.error("Error normalizing room_details:", e);
    return [];
  }
};

/**
 * Gets the appropriate icon component for availability status
 * @param {string} iconType - The icon type
 * @returns {string} - Lucide React icon name
 */
export const getAvailabilityIcon = (iconType) => {
  const iconMap = {
    'check': 'CheckCircle',
    'ban': 'Ban',
    'wrench': 'Wrench',
    'alert': 'AlertTriangle',
    'question': 'HelpCircle'
  };
  
  return iconMap[iconType] || 'HelpCircle';
};
