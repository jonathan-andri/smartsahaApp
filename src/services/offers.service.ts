import { Offer, OfferType } from "../types/offer.types";
import { api, handleApiError } from "./api";

class OffersService {
  // Récupérer toutes les offres
  async getOffers(filters?: {
    type?: OfferType;
    category?: string;
    region?: string;
  }): Promise<Offer[]> {
    try {
      const response = await api.get("/offers/", { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  // Récupérer une offre spécifique
  async getOffer(id: string): Promise<Offer> {
    try {
      const response = await api.get(`/offers/${id}/`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  // Créer une offre
  async createOffer(offer: Partial<Offer>): Promise<Offer> {
    try {
      const response = await api.post("/offers/", offer);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  // Mettre à jour une offre
  async updateOffer(id: string, offer: Partial<Offer>): Promise<Offer> {
    try {
      const response = await api.patch(`/offers/${id}/`, offer);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  // Supprimer une offre
  async deleteOffer(id: string): Promise<void> {
    try {
      await api.delete(`/offers/${id}/`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  // Upload d'image
  async uploadImage(uri: string): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri,
        type: "image/jpeg",
        name: "offer-image.jpg",
      } as any);

      const response = await api.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.url;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}

export default new OffersService();