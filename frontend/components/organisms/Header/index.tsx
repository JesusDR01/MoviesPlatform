import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
export const Header = () => {
  const router = useRouter()

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, query } = router
    router.push({ pathname, query }, router.asPath, { locale: newLocale })
  }

  const { t } = useTranslation()
  return (
    <AppBar position="fixed" elevation={4} style={{ backgroundColor: '#FFF' }}>
      <Toolbar
        sx={{ flexWrap: 'wrap', flexGrow: 1, justifyContent: 'space-between' }}
      >
        <Link href="/">
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {t('Header')}
          </Typography>
        </Link>
        <Box sx={{ marginRight: '25px' }}>
          <Box
            sx={{ display: 'inline-block', cursor: 'pointer' }}
            onClick={() => onToggleLanguageClick('en')}
          >
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ display: 'inline-block' }}
            >
              EN
            </Typography>
          </Box>

          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{
              display: 'inline-block',
              paddingX: '1px',
              marginX: '10px',
              background: 'black',
              height: '30px',
            }}
          ></Typography>
          <Box
            sx={{ display: 'inline-block', cursor: 'pointer' }}
            onClick={() => onToggleLanguageClick('es')}
          >
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ display: 'inline-block' }}
            >
              ES
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
