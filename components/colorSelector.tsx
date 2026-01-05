//fonction de séléction de couleur
export const colorSelect = (ti: string) => {
    switch(ti) {
      case "Vanille":	return "bg-emerald-100";
      case "Maïs":	return "bg-orange-100";
      case "Blé":	return "bg-amber-100";
      case "Noix de cacao":	return "bg-purple-100";
      case "Fraise":	return "bg-red-100";
      case "Raisin":	return "bg-indigo-100";
      default: return "bg-gray-100"
    }
  }