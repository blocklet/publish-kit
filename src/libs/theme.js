import { create } from '@arcblock/ux/lib/Theme';
import colors from '@arcblock/ux/lib/Colors';

const theme = create({
  overrides: {
    MuiTable: {
      root: {
        backgroundColor: 'transparent',
      },
    },
    MuiTableCell: {
      root: {
        backgroundColor: 'transparent',
        borderBottomColor: colors.divider,
      },
      footer: {
        border: 'none',
      },
    },
    MUIDataTableHeadCell: {
      root: {
        whiteSpace: 'nowrap',
      },
      sortAction: {
        alignItems: 'center',
      },
      fixedHeader: {
        backgroundColor: `${colors.common.white}`,
      },
    },
    MuiMenu: {
      list: {
        backgroundColor: '#fff',
      },
    },
  },
});

export default theme;
