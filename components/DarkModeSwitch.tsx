import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react'

export const DarkModeSwitch = () => {

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      margin={4}
      variant='ghost'
      aria-label="Toggle Dark Switch"
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
    />
  );
}