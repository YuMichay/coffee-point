import React from "react";
import { Container, Sprite, Text } from "@pixi/react";
import { Texture, Ticker } from "pixi.js";
import { GlowFilter } from "@pixi/filter-glow";
import { createTextStyle } from "../utils/createTextStyle";
import { createGlowFilter } from "../utils/createGlowFilter";
import { logoImage } from "../images";

interface WelcomePageProps {
  width: number;
  height: number;
  onClick: () => void;
}

export const WelcomePage = ({ width, height, onClick }: WelcomePageProps) => {
  const logo = logoImage;
  const [glowFilter, setGlowFilter] = React.useState<GlowFilter | null>(null);
  const [strength, setStrength] = React.useState<number>(0);
  const buttonStyle = createTextStyle();
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [buttonGlowFilter, setButtonGlowFilter] = React.useState<GlowFilter | null>(null);

  const handleMouseOver = () => {
    setButtonGlowFilter(createGlowFilter(2));
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setButtonGlowFilter(null);
    setIsHovered(false);
  };

  React.useEffect(() => {
    const newGlowFilter = createGlowFilter(0);
    setGlowFilter(newGlowFilter);
  }, []);

  React.useEffect(() => {
    const ticker = new Ticker();
    ticker.add(() => {
      const now = Date.now() * 0.001;
      setStrength(0.5 + Math.sin(now * 2) * 0.5);
    });
    ticker.start();
    return () => {
      ticker.stop();
      ticker.destroy();
    };
  }, []);

  React.useEffect(() => {
    if (glowFilter) {
      glowFilter.outerStrength = strength * 5;
      glowFilter.innerStrength = strength * 5;
    }
  }, [strength, glowFilter]);

  return (
    <Container anchor={0.5} >
      <Sprite
        texture={Texture.from(logo)}
        x={width / 2}
        y={height / 2 - 50}
        anchor={0.5}
        scale={1.2}
        filters={glowFilter ? [glowFilter] : []}
      />
      <Container
        x={width / 2}
        y={height / 2 + 200}
        interactive={true}
        pointerdown={() => onClick()}
        cursor="pointer"
        mouseover={handleMouseOver}
        mouseout={handleMouseOut}
        filters={isHovered && buttonGlowFilter ? [buttonGlowFilter] : []}
        alpha={0.8}
      >
        <Sprite
          texture={Texture.WHITE}
          width={200}
          height={80}
          anchor={0.5}
          tint={0x12121C}
        />
        <Text text="Play" anchor={0.5} style={buttonStyle} />
      </Container>
    </Container>
  );
}
