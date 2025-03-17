import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function CamionManager() {
  const [camions, setCamions] = useState([]);
  const [formData, setFormData] = useState({ immatriculation: "", poids_max: "" });

  useEffect(() => {
    fetchCamions();
  }, []);

  const fetchCamions = async () => {
    const response = await axios.get("http://localhost:5000/camions");
    setCamions(response.data);
  };

  const addCamion = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/camions", formData);
    setFormData({ immatriculation: "", poids_max: "" });
    fetchCamions();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Gestion des Camions</h1>
      <form onSubmit={addCamion} className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Immatriculation"
          value={formData.immatriculation}
          onChange={(e) => setFormData({ ...formData, immatriculation: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Poids Max"
          value={formData.poids_max}
          onChange={(e) => setFormData({ ...formData, poids_max: e.target.value })}
        />
        <Button type="submit">Ajouter</Button>
      </form>

      <div className="grid gap-4">
        {camions.map((camion) => (
          <Card key={camion.Id_Camion}>
            <CardContent className="p-4">
              <p>Immatriculation: {camion.immatriculation}</p>
              <p>Poids Max: {camion.poids_max} kg</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
