// CRITICAL: Replit 3D Flip Card Component
import { useState } from "react";
import { Asset } from "@shared/schema";
import GlassCard from "@/components/ui/glass-card";
import NeonButton from "@/components/ui/neon-button";
import { useSound } from "@/contexts/sound-context";

interface AssetCardProps {
  asset: Asset;
  onClick: () => void;
}

export default function AssetCard({ asset, onClick }: AssetCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { playSound } = useSound();

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    playSound("click");
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      className="flip-card hover-lift"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      data-testid={`asset-card-${asset.id}`}
    >
      <div className={`flip-card-inner ${isFlipped ? 'transform rotateY-180' : ''}`}>
        {/* Front - Visual Preview */}
        <div className="flip-card-front flex flex-col">
          <img
            src={asset.imageUrl}
            alt={asset.name}
            className="w-full h-48 object-cover rounded-t-2xl"
          />
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2 text-primary">{asset.name}</h3>
              <p className="text-muted-foreground mb-4">
                {asset.type === "horse"
                  ? `${asset.location} • ${asset.performance}`
                  : `${asset.location} • ${asset.rentYield}% Yield`
                }
              </p>
            </div>
            <div>
              <div className="text-2xl font-bold neon-text mb-4">{asset.price} ASRD</div>
              <div className="text-sm text-muted-foreground">${asset.priceUsd.toLocaleString()} USD</div>
            </div>
          </div>
        </div>

        {/* Back - Detailed Data */}
        <div className="flip-card-back flex flex-col p-6 justify-center">
          <h3 className="text-xl font-bold mb-4 text-primary">
            {asset.type === "horse" ? "Horse Profile" : "Property Details"}
          </h3>
          <div className="space-y-3 mb-6">
            {asset.type === "horse" ? (
              <>
                <div className="flex justify-between">
                  <span>Pedigree:</span>
                  <span className="text-primary">{asset.pedigree}</span>
                </div>
                <div className="flex justify-between">
                  <span>Performance:</span>
                  <span className="text-primary">{asset.performance}</span>
                </div>
                <div className="flex justify-between">
                  <span>Next Race:</span>
                  <span className="text-primary">{asset.nextRace}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <span>Value:</span>
                  <span className="text-primary">{asset.propertyValue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rent Yield:</span>
                  <span className="text-primary">{asset.rentYield}% Annual</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="text-primary">{asset.propertyType}</span>
                </div>
              </>
            )}
          </div>
          <NeonButton
            onClick={handleBuyClick}
            variant={asset.isAuction ? "glass" : "primary"}
            className="w-full"
          >
            {asset.isAuction ? "Join Auction" : "Buy Now"}
          </NeonButton>
        </div>
      </div>
    </div>
  );
}
