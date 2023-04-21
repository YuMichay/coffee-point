import { Sprite } from "@pixi/react";
import { Texture } from "pixi.js";
import { useStore } from "../../store/store";
import { observer } from "mobx-react";

export const Volume = observer(() => {
  const { AppStore, GameStore, handleVolumeOnOff } = useStore();
  const positionX = AppStore.width > 768 ? AppStore.width - 260 : AppStore.width - 160;

  return (
    <>
      <Sprite
        texture={Texture.from(GameStore.volumeCurrentImage)}
        x={positionX}
        y={30}
        anchor={0.5}
        scale={1.2}
        interactive={!GameStore.isMenuOpen}
        cursor={GameStore.isMenuOpen ? "auto" : "pointer"}
        pointerdown={handleVolumeOnOff}
      />
    </>
  );
});